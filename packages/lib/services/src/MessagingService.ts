import { IEncryptedMessage, IMessage, MessageDTO } from '@lckw/lib-models';
import { MessageBox } from './MessageBox';
import { BaseAPIProvider, IAuth } from './BaseAPIProvider';
import { ISession } from './SessionManager';

export type IListener = (message: IMessage) => void;

export abstract class MessagingService {
    protected listeners: (IListener | null)[] = [];
    private _session: ISession | undefined = void 0;

    private get session(): ISession {
        if (!this._session) {
            throw new Error('MessagingService has not been initialized with session');
        }
        return this._session;
    }

    constructor(
        protected api: BaseAPIProvider,
        protected auth: IAuth,
        private serverId: string
    ) {
    }

    protected abstract ack(messageId: string): Promise<void>;

    initSession(session: ISession): void {
        this._session = session;
    }

    addListener(fn: IListener): number {
        return this.listeners.push(fn);
    }

    removeListener(index: number): void {
        this.listeners[index] = null;
    }

    async send(messageData: IEncryptedMessage) {
        await this.api.send(
            {
                to: this.session.cpId,
                from: this.session.id,
                ...messageData
            },
            this.auth
        );
    }

    protected async emitEvent(message: { data: object; from: string }) {
        const data = message.data;
        if (message.from === this.serverId && this.isMessage(data)) {
            const dataDecrypted = MessageBox.decrypt(data, {
                key: this.session.secretKey,
                sign: this.session.cpKey
            });
            const messageData = MessageDTO.create(dataDecrypted);
            this.listeners.forEach((fn) => fn && fn(messageData));
            await this.ack(messageData.id);
        }
    }

    private isMessage(value: object): value is IEncryptedMessage {
        return !!(value as IEncryptedMessage).data && !!(value as IEncryptedMessage).nonce;
    }
}
