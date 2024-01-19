import type { Pipe } from '@lckw/lib-services';
import { type IMessageData, type IDeviceMetadata, MessageDataDTO, MessageType } from '@lckw/lib-models';
import { SessionDevicePlatform } from '@lckw/lib-models';
import { SessionDevice } from '@lckw/lib-models';

export const getDeviceMetadata = (): IDeviceMetadata => {
    return {
        name: 'Test',
        device: SessionDevice.CHROMIUM,
        platform: SessionDevicePlatform.LINUX,
        description: '',
    };
};

export const metadataRequestHandler = async (data: IMessageData, pipe: Pipe): Promise<void> => {
    const message = MessageDataDTO.create({ type: MessageType.METADATA, value: getDeviceMetadata() });
    await pipe.push(message);
};
