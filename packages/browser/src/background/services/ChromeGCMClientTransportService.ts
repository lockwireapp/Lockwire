import { APIProviderV1 } from '@lckw/api';
import type { MessageType } from '@lckw/lib-models';
import {
    BaseAPIProvider,
    type BaseAuthService,
    type ITransportMessageHandler,
    type ISession,
    MessagingService,
    Transport,
} from '@lckw/lib-services';
import { GCMMessagingService } from '~src/background/services/GCMMessagingService';
import { FirebaseAuthService } from '~src/background/services/FirebaseAuthService';
import { getConfig } from '~src/background/background.const';

export class ChromeGCMClientTransportService extends Transport {
    protected auth: BaseAuthService;
    protected api: BaseAPIProvider;
    protected messaging: MessagingService;

    constructor(handlers: Record<MessageType, ITransportMessageHandler>) {
        super(handlers);
        const config = getConfig();
        this.auth = new FirebaseAuthService(config);
        this.api = new APIProviderV1(config.apiUrl, this.auth);
        this.messaging = new GCMMessagingService(this.api, config.messagingSenderId);
    }

    init(session: ISession): Transport {
        this.messaging.initSession(session);
        super.init(session);
        return this;
    }
}
