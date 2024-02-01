import { getMessaging } from 'firebase-admin/messaging';
import * as log from 'firebase-functions/logger';
import { v4 as uuid } from 'uuid';
import { getDatabase } from 'firebase-admin/database';
import { ACK_MESSAGES_DB_NAME } from '../endpoints/ack/AckService';
import { MessageDTO } from '@lckw/lib-models';
import { Participant } from '../entities/Participant';
import { Box, Key } from '@lckw/lib-crypto';
import { TimeoutError } from '../decorators/WithHttpError';

const getMessageId = async (): Promise<string> => {
    let messageId = uuid();
    const dbRef = getDatabase().ref(ACK_MESSAGES_DB_NAME);
    const isAvailable = async (id: string) => !(await dbRef.child(id).get()).exists();
    while (!(await isAvailable(messageId))) {
        messageId = uuid();
    }
    return messageId;
};

/**
 * TTL = 0 means FCM will try to deliver instantly, without throttling and storing message
 */
const fcmMessageConfig = {
    apns: {
        headers: {
            'apns-expiration': '0',
        },
    },
    android: {
        ttl: 0,
    },
    webpush: {
        headers: {
            TTL: '0',
        },
    },
};

const DEFAULT_MESSAGE_ACK_TIMEOUT_MS = 60 * 1000;
const DEFAULT_MESSAGE_ACK_CHECK_PERIOD_MS = 500;

export class MessagingService {
    private readonly messageAckWaitingTimeout: number = DEFAULT_MESSAGE_ACK_TIMEOUT_MS;
    private readonly messageAckCheckPeriod: number = DEFAULT_MESSAGE_ACK_CHECK_PERIOD_MS;

    async send(sender: Participant, recipient: Participant, data: string, nonce: string) {
        const messageSent = Date.now();
        const messageId = await getMessageId();

        const message = MessageDTO.create({
            id: messageId,
            from: sender.id,
            key: sender.key,
            data,
            nonce,
        });

        const box = new Box(Key.fromBase64String(recipient.secretKey));
        const messageBox = box.encrypt(message.toBase64(), Key.fromBase64String(recipient.key));
        console.log('Sending message');
        const fcmMessageId = await getMessaging().send({
            ...fcmMessageConfig,
            token: recipient.pushToken,
            data: messageBox,
        });
        console.log('Sent. Waiting for ACK');

        const receivedAt = await this.waitForAck(messageId);

        log.info(`Message has been delivered in ${receivedAt - messageSent}ms. n\Message id: "${fcmMessageId}"`);
    }

    private async waitForAck(messageId: string): Promise<number> {
        const timeStart = Date.now();
        return new Promise((res, rej) => {
            const timer = async () => {
                const ref = getDatabase().ref(ACK_MESSAGES_DB_NAME).child(messageId);
                const valueRef = await ref.get();
                if (valueRef.exists()) {
                    const timestamp = valueRef.val();
                    log.info(`Received message ACK at ${timestamp}. MessageId: "${messageId}"`);
                    await ref.remove();
                    res(timestamp);
                } else if (timeStart + this.messageAckWaitingTimeout >= Date.now()) {
                    console.log('Waiting...');
                    setTimeout(timer, this.messageAckCheckPeriod);
                } else {
                    log.error(`Message ACK timed out. MessageId: "${messageId}"`);
                    rej(new TimeoutError());
                }
            };

            log.info(`Starting waiting for message ACK. MessageId: "${messageId}"`);
            timer();
        });
    }
}
