import { IMessageData, MessageDataDTO, MessageType } from '@lckw/lib-models';
import { IInitSessionProps, SessionInitService } from './SessionInitService';
import { ISession, SessionManager } from './SessionManager';
import { ICredentials, MessageBox } from './MessageBox';
import { MessagingService } from './MessagingService';
import { BaseAPIProvider } from './BaseAPIProvider';

export type IPipeMessageHandler = (data: IMessageData, pipe: Pipe) => Promise<void>;

export abstract class Pipe {
    protected abstract api: BaseAPIProvider;
    protected abstract messaging: MessagingService;

    private encryptCredentials: ICredentials;
    private decryptCredentials: ICredentials;

    constructor(protected handlers: Record<MessageType, IPipeMessageHandler>) {}

    async create(props: IInitSessionProps): Promise<void> {
        const service = new SessionInitService(this.api, this.messaging);
        const session = await service.initSession(props);
        this.init(session);
    }

    async connect(session: ISession): Promise<void> {
        // TODO implement
        this.init(session);
    }

    async push(data: IMessageData): Promise<void> {
        if (!this.encryptCredentials) {
            throw new Error('Pipe is not initialized');
        }
        const messageDataBox = MessageDataDTO.create(data);
        const messageDataEncrypted = MessageBox.encrypt(messageDataBox.toBase64(), this.encryptCredentials);
        await this.messaging.send(messageDataEncrypted);
    }

    init({ secretKey, key, cpKey }: ISession): Pipe {
        this.subscribeMessageHandlers();
        this.encryptCredentials = { key: cpKey, sign: key };
        this.decryptCredentials = { key: secretKey, sign: cpKey };
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
