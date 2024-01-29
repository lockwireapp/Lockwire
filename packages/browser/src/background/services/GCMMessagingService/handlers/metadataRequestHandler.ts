import type { Transport } from '@lckw/lib-services';
import { type IMessageData, type IDeviceMetadata, MessageDataDTO, MessageType } from '@lckw/lib-models';
import { SessionDevicePlatform } from '@lckw/lib-models';
import { SessionDevice } from '@lckw/lib-models';

// TODO implement
export const getDeviceMetadata = (): IDeviceMetadata => {
    return {
        name: '',
        description: '',
        device: SessionDevice.UNKNOWN,
        platform: SessionDevicePlatform.UNKNOWN,
    };
};

export const metadataRequestHandler = async (data: IMessageData, pipe: Transport): Promise<void> => {
    const message = MessageDataDTO.create({ type: MessageType.METADATA, value: getDeviceMetadata() });
    await pipe.push(message);
};
