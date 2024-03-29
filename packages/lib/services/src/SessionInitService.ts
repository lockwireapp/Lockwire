import { Base64String } from '@lckw/lib-utils';
import { Crypto, Keypair } from '@lckw/lib-crypto';
import { MessageDataDTO, MessageType } from '@lckw/lib-models';
import { ISession, SessionManager } from './SessionManager';
import { ICredentials, MessageBox } from './MessageBox';
import { MessagingService } from './MessagingService';
import { BaseAPIProvider, IdTokenRevokedError } from './BaseAPIProvider';
import { BaseAuthService } from './BaseAuthService';

export interface IInitSessionProps {
    pushToken: string;
    onSessionIdChange: (sessionId: string, key: string) => Promise<void>;
}

class TimeoutError extends Error {}

const SESSION_CONNECT_TIMEOUT_MS = 60 * 1000;
const MAX_ATTEMPTS_COUNT = 15;

export class SessionInitService {
    constructor(
        private api: BaseAPIProvider,
        private auth: BaseAuthService,
        private messaging: MessagingService,
    ) {}

    async initSession(props: IInitSessionProps, attempt: number = 0): Promise<ISession> {
        if (attempt >= MAX_ATTEMPTS_COUNT) {
            throw new Error('Max session init attempts reached');
        }

        try {
            return await this.sessionInitAttempt(props);
        } catch (e) {
            if (e instanceof TimeoutError || e instanceof IdTokenRevokedError) {
                return this.initSession(props, attempt + 1);
            } else {
                throw e;
            }
        }
    }

    private async sessionInitAttempt({ pushToken, onSessionIdChange }: IInitSessionProps): Promise<ISession> {
        const { id, keypair, serverSign } = await this.createSession(pushToken);
        const pubKey = keypair.publicKey.toBase64String();
        const secretKey = keypair.secretKey.toBase64String();
        await onSessionIdChange(id, pubKey);

        this.messaging.initSession({
            id,
            key: pubKey,
            secretKey: secretKey,
            cpId: String(null),
            cpKey: String(null),
            serverSign,
        });

        const counterparty = await this.onSessionActive({ key: secretKey, sign: serverSign });
        return await SessionManager.createSession({
            id,
            key: pubKey,
            secretKey,
            cpId: counterparty.from,
            cpKey: counterparty.key,
            serverSign,
        });
    }

    private async createSession(pushToken: string): Promise<{ id: string; keypair: Keypair; serverSign: string }> {
        await this.auth.signInAnonymously();
        const keypair = Crypto.generateKeyPair();
        const pubKey = keypair.publicKey.toBase64String();
        const response = await this.api.init({ pushToken, key: pubKey });
        const id = response.id;
        const serverSign = response.key;
        return { id, keypair, serverSign };
    }

    private async onSessionActive({ key }: ICredentials): Promise<{ from: string; key: Base64String }> {
        return new Promise((res, rej) => {
            const rejectionTimeout = setTimeout(
                () => rej(new TimeoutError('Timeout error')),
                SESSION_CONNECT_TIMEOUT_MS,
            );

            const index = this.messaging.addListener((message) => {
                try {
                    if (message.key && message.data && message.nonce) {
                        const messageDataDecrypted = MessageBox.decrypt(message, { key, sign: message.key });
                        const messageData = MessageDataDTO.create(messageDataDecrypted);
                        if (messageData.type === MessageType.CONNECT) {
                            this.messaging.removeListener(index);
                            clearTimeout(rejectionTimeout);
                            res({ from: message.from, key: message.key });
                        } else {
                            console.warn(`Got a message without payload on init. Skipping`);
                        }
                    } else {
                        console.warn('Got unknown message on init. Skipping');
                    }
                } catch (e) {
                    this.messaging.removeListener(index);
                    clearTimeout(rejectionTimeout);
                    rej(e);
                }
            });
        });
    }
}
