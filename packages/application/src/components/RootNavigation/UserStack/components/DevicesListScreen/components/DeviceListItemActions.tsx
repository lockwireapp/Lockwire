import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { UserNavigation, useUserNavigation } from '../../../hooks/useUserNavigation';

interface IDeviceListItemActionsProps {
    id: string;
}

export const DeviceListItemActions: React.FC<IDeviceListItemActionsProps> = ({ id }) => {
    const navigator = useUserNavigation();

    return (
        <View style={{ flexDirection: 'row' }}>
            <IconButton
                icon={'square-edit-outline'}
                size={24}
                onPress={() => navigator.navigate(UserNavigation.DEVICE_LIST_ITEM, { id })}
                style={{ marginRight: 0 }}
            />
        </View>
    );
};
