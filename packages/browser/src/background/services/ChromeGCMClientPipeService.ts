import { getAuth } from 'firebase/auth';
import { BaseAPIProvider, type ISession, MessagingService, Pipe } from '@lckw/lib-services';
import { GCMMessagingService } from '~src/background/services/GCMMessagingService';
import { getConfig } from '~src/background/background.const';
import { APIProviderV1 } from '@lckw/api';

export class ChromeGCMClientPipeService extends Pipe {
    protected api: BaseAPIProvider;
    protected messaging: MessagingService;

    init(session: ISession): Pipe {
        const auth = getAuth();
        const config = getConfig();
        this.api = new APIProviderV1(config.apiUrl);
        this.messaging = new GCMMessagingService(this.api, auth, config.messagingSenderId, session);
        super.init(session);
        return this;
    }
}
