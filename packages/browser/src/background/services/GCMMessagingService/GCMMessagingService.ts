import type { IListener } from '@lckw/lib-services';
import { MessagingService } from '@lckw/lib-services';

export class GCMMessagingService extends MessagingService {
    addListener(fn: IListener): number {
        const index = super.addListener(fn);
        chrome.gcm.onMessage.addListener(async ({ data, from }: chrome.gcm.IncomingMessage) => {
            if (from) {
                try {
                    await this.emitEvent({ data, from });
                } catch (e) {
                    throw new Error(`Failed to process GCM message from ${from}`);
                }
            } else {
                console.warn('Ignored GCM message from unknown sender');
            }
        });
        return index;
    }

    protected async ack(messageId: string): Promise<void> {
        await this.api.ack({ messageId }, this.auth);
    }
}
