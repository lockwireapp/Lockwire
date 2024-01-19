import { Crypto } from '@lckw/lib-crypto';
import { IErrorResponse } from '../../interfaces/IErrorResponse';
import { Participant } from '../../entities/Participant';

export interface IInitRequest {
    pushToken: string;
    key: string;
}

export interface IInitResponse extends IErrorResponse {
    id: string;
    key: string;
}

export class InitService {
    async init({ key, pushToken }: IInitRequest): Promise<IInitResponse> {
        const keypair = Crypto.generateKeyPair();
        const participant = await Participant.create({ key, pushToken, secretKey: keypair.secretKey.toString() });

        // TODO set csrf cookie

        return {
            id: participant.id,
            key: keypair.publicKey.toString(),
        };
    }
}
