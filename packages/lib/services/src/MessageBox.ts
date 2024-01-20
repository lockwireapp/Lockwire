import { Box, Key } from '@lckw/lib-crypto';
import { Base64String } from '@lckw/lib-utils';
import { IEncryptedMessage } from '@lckw/lib-models';

export interface ICredentials {
    key: string;
    sign: string;
}

export class MessageBox {
    static encrypt(data: Base64String, { key, sign }: ICredentials): IEncryptedMessage {
        const box = new Box(Key.fromBase64String(key));
        return box.encrypt(data, Key.fromBase64String(sign));
    }

    static decrypt<T>({ data, nonce }: IEncryptedMessage, { key, sign }: ICredentials): T {
        const box = new Box(Key.fromBase64String(key));
        try {
            const messageStr = box.decrypt(data, nonce, Key.fromBase64String(sign));
            if (!messageStr) {
                throw new Error('Failed to decrypt message');
            }

            /**
             * TODO message data may potentially appear in logs on parse error
             */
            return JSON.parse(atob(messageStr)) as T;
        } catch (e) {
            throw new Error(`Failed to decrypt PUSH message. ${(e as Error).message}`);
        }
    }
}
