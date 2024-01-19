import { Body, Controller, Post, Route, Security } from 'tsoa';
import { AckService, IAckRequest } from './AckService';
import { WithLog } from '../../decorators/WithLog';
import { WithHttpError } from '../../decorators/WithHttpError';
import { AUTH_SCOPES, JWT_AUTH } from '../../../authentication';
import { IConnectRequest } from '../connect/ConnectService';

@Route('v1/ack')
export class AckController extends Controller {
    @Post()
    @WithHttpError()
    @WithLog<IConnectRequest>(([{ to }]) => `for client id: "${to}"`)
    @Security(JWT_AUTH, [AUTH_SCOPES.CLIENT, AUTH_SCOPES.VAULT])
    async ack(@Body() body: IAckRequest) {
        return new AckService().ack(body);
    }
}
