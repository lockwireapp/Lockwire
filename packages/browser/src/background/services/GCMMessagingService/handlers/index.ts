import { NOOP } from '@lckw/lib-utils';
import type { MessageType } from '@lckw/lib-models';
import type { IPipeMessageHandler } from '@lckw/lib-services';
import { metadataRequestHandler } from './metadataRequestHandler/metadataRequestHandler';

export const messageHandlers: Record<MessageType, IPipeMessageHandler> = {
    CONNECT: NOOP,
    GET_METADATA: metadataRequestHandler,
    METADATA: NOOP,
    GET_TARGET: NOOP,
    TARGET: NOOP,
};
