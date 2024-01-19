import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import { IInitRequest, InitService } from './InitService';
import { WithLog } from '../../decorators/WithLog';
import { WithHttpError } from '../../decorators/WithHttpError';
import { AUTH_SCOPES, JWT_AUTH } from '../../../authentication';

@Route('v1/init')
export class InitController extends Controller {
    @Post()
    @WithLog()
    @WithHttpError()
    @Security(JWT_AUTH, [AUTH_SCOPES.CLIENT])
    @SuccessResponse(200, 'OK')
    async init(@Body() body: IInitRequest) {
        return new InitService().init(body);
    }
}
