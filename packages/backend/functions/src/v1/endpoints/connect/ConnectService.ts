import { Crypto } from '@lckw/lib-crypto';
import { IMessageWithPayload } from '../../interfaces/IMessageWithPayload';
import { IErrorResponse } from '../../interfaces/IErrorResponse';
import { Participant } from '../../entities/Participant';
import { GoneError } from '../../decorators/WithHttpError';
import { MessagingService } from '../../services/Messaging.service';

export interface IConnectRequest extends IMessageWithPayload {
    to: string;
    pushToken: string;
    key: string;
}

export interface IConnectResponse extends IErrorResponse {
    key: string;
}

export class ConnectService {
    async connect({ to, key, pushToken, data, nonce }: IConnectRequest): Promise<IConnectResponse> {
        const receiver = await Participant.get(to);

        if (receiver && !receiver.active) {
            const messaging = new MessagingService();
            const keyPair = Crypto.generateKeyPair();
            const sender = await Participant.create({ key, pushToken, secretKey: keyPair.secretKey.toBase64String() });
            await messaging.send(sender, receiver, data, nonce);
            await sender.activate(receiver.id);
            // TODO convert receiver to permanent user using signInWithCustomToken
            await receiver.activate(sender.id);

            return { key: keyPair.publicKey.toBase64String() };
        } else {
            // here some actions may be needed to prevent id search using brute force
            // the probability of guessing is near zero, but still
            // at least some kind of brute force search detection may need
            throw new GoneError();
        }
    }
}
