import { Body, Controller, Post, Route, Security } from 'tsoa';
import { ConnectService, IConnectRequest } from './ConnectService';
import { AUTH_SCOPES, JWT_AUTH } from '../../../authentication';
import { WithHttpError } from '../../decorators/WithHttpError';
import { WithLog } from '../../decorators/WithLog';

@Route('v1/connect')
export class ConnectController extends Controller {
    @Post()
    @WithHttpError()
    @WithLog<IConnectRequest>(([{ to }]) => `for client id: "${to}"`)
    @Security(JWT_AUTH, [AUTH_SCOPES.VAULT])
    async connect(@Body() body: IConnectRequest) {
        return new ConnectService().connect(body);
    }
}
