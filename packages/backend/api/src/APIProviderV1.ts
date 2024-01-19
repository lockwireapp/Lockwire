import { BaseAPIProvider, type IAuth } from '@lckw/lib-services';
import { API } from "../../functions";

// TODO extract from swagger or metadata;
export const API_CONNECT_ENDPOINT_V1 = '/api/v1/connect';
export const API_INIT_ENDPOINT_V1 = '/api/v1/init';
export const API_ACK_ENDPOINT_V1 = '/api/v1/ack';
export const API_SEND_ENDPOINT_V1 = '/api/v1/send';

export class APIProviderV1 extends BaseAPIProvider {
    init: (data: API['IInitRequest'], auth: IAuth) => Promise<API['IInitResponse']>;
    ack: (data: API['IAckRequest'], auth: IAuth) => Promise<API['IAckResponse']>;
    send: (data: API['ISendRequest'], auth: IAuth) => Promise<API['ISendResponse']>;
    connect: (data: API['IConnectRequest'], auth: IAuth) => Promise<API['IConnectResponse']>;

    constructor(apiUrl: string) {
        super();
        this.init = this.endpointFactory<API['IInitRequest'], API['IInitResponse']>(`${apiUrl}${API_INIT_ENDPOINT_V1}`);
        this.ack = this.endpointFactory<API['IAckRequest'], API['IAckResponse']>(`${apiUrl}${API_ACK_ENDPOINT_V1}`);
        this.send = this.endpointFactory<API['ISendRequest'], API['ISendResponse']>(`${apiUrl}${API_SEND_ENDPOINT_V1}`);
        this.connect = this.endpointFactory<API['IConnectRequest'], API['IConnectResponse']>(
            `${apiUrl}${API_CONNECT_ENDPOINT_V1}`,
        );
    }
}