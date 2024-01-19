import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import { ISendRequest, SendService } from './SendService';
import { WithLog } from '../../decorators/WithLog';
import { WithHttpError } from '../../decorators/WithHttpError';
import { AUTH_SCOPES, JWT_AUTH } from '../../../authentication';

@Route('v1/send')
export class SendController extends Controller {
    @Post()
    @WithLog()
    @WithHttpError()
    @Security(JWT_AUTH, [AUTH_SCOPES.CLIENT, AUTH_SCOPES.VAULT])
    @SuccessResponse(200, 'OK')
    async init(@Body() body: ISendRequest) {
        return new SendService().send(body);
    }
}
