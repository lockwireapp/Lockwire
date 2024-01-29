import { IMessageData, MessageDataDTO, MessageType } from '@lckw/lib-models';
import { IInitSessionProps, SessionInitService } from './SessionInitService';
import { ISession, SessionManager } from './SessionManager';
import { ICredentials, MessageBox } from './MessageBox';
import { MessagingService } from './MessagingService';
import { BaseAPIProvider } from './BaseAPIProvider';
import { BaseAuthService } from './BaseAuthService';

export type IPipeMessageHandler = (data: IMessageData, pipe: Pipe) => Promise<void>;

export abstract class Pipe {
    protected abstract auth: BaseAuthService;
    protected abstract api: BaseAPIProvider;
    protected abstract messaging: MessagingService;

    private _encryptCredentials: ICredentials | undefined = void 0;
    private get encryptCredentials(): ICredentials {
        if (!this._encryptCredentials) {
            throw new Error('Pipe missing encrypt credentials. Please call init before use');
        }
        return this._encryptCredentials;
    }

    private _decryptCredentials: ICredentials | undefined = void 0;
    private get decryptCredentials(): ICredentials {
        if (!this._decryptCredentials) {
            throw new Error('Pipe missing decrypt credentials. Please call init before use');
        }
        return this._decryptCredentials;
    };

    constructor(protected handlers: Record<MessageType, IPipeMessageHandler>) {
    }

    async create(props: IInitSessionProps): Promise<void> {
        const service = new SessionInitService(this.api, this.auth, this.messaging);
        const session = await service.initSession(props);
        this.init(session);
    }

    async connect(session: ISession): Promise<void> {
        // TODO implement
        this.init(session);
    }

    async push(data: IMessageData): Promise<void> {
        const messageDataBox = MessageDataDTO.create(data);
        const messageDataEncrypted = MessageBox.encrypt(messageDataBox.toBase64(), this.encryptCredentials);
        await this.messaging.send(messageDataEncrypted);
    }

    init({ secretKey, key, cpKey }: ISession): Pipe {
        this.subscribeMessageHandlers();
        this._encryptCredentials = { key: cpKey, sign: key };
        this._decryptCredentials = { key: secretKey, sign: cpKey };
        return this;
    }

    protected subscribeMessageHandlers(): void {
        const listenerId = this.messaging.addListener((message) => {
            const dataDecrypted = MessageBox.decrypt(message, this.decryptCredentials);
            const messageData = MessageDataDTO.create(dataDecrypted);
            const handler = this.handlers[messageData.type];
            if (!handler) {
                console.error(`Received message with unsupported type ${messageData.type}`);
            } else {
                handler(messageData, this).catch(console.error);
            }
        });

        SessionManager.onSessionEnd(() => this.messaging.removeListener(listenerId));
    }
}
