import { SessionDevicePlatform } from './SessionDevicePlatform';
import { SessionDevice } from './SessionDevice';

export interface IDeviceMetadata {
    name: string;
    device: SessionDevice;
    platform: SessionDevicePlatform;
    description: string;
}

export interface IDeviceMetadataInternal extends IDeviceMetadata {
    creationDate: string;
    loaded: boolean;
}
