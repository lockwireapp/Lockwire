import { getAuth } from 'firebase/auth';
import { APIProviderV1 } from '@lckw/api';
import type { MessageType } from '@lckw/lib-models';
import { BaseAPIProvider, type IPipeMessageHandler, type ISession, MessagingService, Pipe } from '@lckw/lib-services';
import { GCMMessagingService } from '~src/background/services/GCMMessagingService';
import { getConfig } from '~src/background/background.const';

export class ChromeGCMClientPipeService extends Pipe {
    protected api: BaseAPIProvider;
    protected messaging: MessagingService;

    constructor(handlers: Record<MessageType, IPipeMessageHandler>) {
        super(handlers);
        const auth = getAuth();
        const config = getConfig();
        this.api = new APIProviderV1(config.apiUrl);
        this.messaging = new GCMMessagingService(this.api, auth, config.messagingSenderId);
    }

    init(session: ISession): Pipe {
        this.messaging.initSession(session);
        super.init(session);
        return this;
    }
}
