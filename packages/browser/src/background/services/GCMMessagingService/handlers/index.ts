import { NOOP } from '@lckw/lib-utils';
import type { MessageType } from '@lckw/lib-models';
import type { ITransportMessageHandler } from '@lckw/lib-services';
import { metadataRequestHandler } from './metadataRequestHandler';

export const messageHandlers: Record<MessageType, ITransportMessageHandler> = {
    CONNECT: NOOP,
    GET_METADATA: metadataRequestHandler,
    METADATA: NOOP,
    GET_TARGET: NOOP,
    TARGET: NOOP,
};
