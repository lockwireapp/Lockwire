import { IErrorResponse } from '../../interfaces/IErrorResponse';
import { getDatabase } from 'firebase-admin/database';

export interface IAckRequest {
    messageId: string;
}

export interface IAckResponse extends IErrorResponse {}

export const ACK_MESSAGES_DB_NAME = 'ackMessages';

export class AckService {
    async ack({ messageId }: IAckRequest): Promise<IAckResponse> {
        await getDatabase().ref(ACK_MESSAGES_DB_NAME).child(messageId).set(Date.now());
        return {};
    }
}
