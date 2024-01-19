import { IErrorResponse } from '../../interfaces/IErrorResponse';
import { Participant } from '../../entities/Participant';
import { GoneError } from '../../decorators/WithHttpError';
import { MessagingService } from '../../services/Messaging.service';

export interface ISendRequest {
    to: string;
    from: string;
    data: string;
    nonce: string;
}

export interface ISendResponse extends IErrorResponse {
    ok: boolean;
}

export class SendService {
    async send({ to, from, data, nonce }: ISendRequest): Promise<ISendResponse> {
        const sender = await Participant.get(from);
        const receiver = await Participant.get(to);

        if (!receiver || !receiver.active || !sender || !sender.active) {
            throw new GoneError();
        }

        // TODO if push token is expired, fail "expired", sender needs to refresh token

        const messaging = new MessagingService();
        await messaging.send(sender, receiver, data, nonce);
        // if success respond success, else error

        return {
            ok: true,
        };
    }
}
