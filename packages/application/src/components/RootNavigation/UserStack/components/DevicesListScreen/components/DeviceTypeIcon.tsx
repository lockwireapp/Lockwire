import React from 'react';
import { IDeviceMetadata } from '@lckw/lib-models';
import { Avatar } from 'react-native-paper';

interface IDeviceTypeIconProps {
    value: IDeviceMetadata | null;
}

export const DeviceTypeIcon: React.FC<IDeviceTypeIconProps> = () => {
    return <Avatar.Icon size={48} icon={'google-chrome'} style={{ backgroundColor: '#ccc' }} />;
};
