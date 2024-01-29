import { API } from '@lckw/backend';
import { BaseAPIProvider, BaseAuthService } from '@lckw/lib-services';

// TODO extract from swagger or metadata;
export const API_CONNECT_ENDPOINT_V1 = '/v1/connect';
export const API_INIT_ENDPOINT_V1 = '/v1/init';
export const API_ACK_ENDPOINT_V1 = '/v1/ack';
export const API_SEND_ENDPOINT_V1 = '/v1/send';

export class APIProviderV1 extends BaseAPIProvider {
    init: (data: API['IInitRequest']) => Promise<API['IInitResponse']>;
    ack: (data: API['IAckRequest']) => Promise<API['IAckResponse']>;
    send: (data: API['ISendRequest']) => Promise<API['ISendResponse']>;
    connect: (data: API['IConnectRequest']) => Promise<API['IConnectResponse']>;

    constructor(apiUrl: string, protected auth: BaseAuthService) {
        super();
        this.init = this.endpointFactory<API['IInitRequest'], API['IInitResponse']>(`${apiUrl}${API_INIT_ENDPOINT_V1}`);
        this.ack = this.endpointFactory<API['IAckRequest'], API['IAckResponse']>(`${apiUrl}${API_ACK_ENDPOINT_V1}`);
        this.send = this.endpointFactory<API['ISendRequest'], API['ISendResponse']>(`${apiUrl}${API_SEND_ENDPOINT_V1}`);
        this.connect = this.endpointFactory<API['IConnectRequest'], API['IConnectResponse']>(
            `${apiUrl}${API_CONNECT_ENDPOINT_V1}`
        );
    }
}