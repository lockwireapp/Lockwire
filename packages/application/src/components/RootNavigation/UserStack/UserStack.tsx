import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LinkDeviceScreenHeader } from './components/LinkDeviceScreen/components/LinkDeviceScreenHeader';
import { DeviceListItemScreen } from './components/DeviceListItemScreen';
import { DevicesListScreen } from './components/DevicesListScreen';
import { LinkDeviceScreen } from './components/LinkDeviceScreen';
import { User, UserNavigation } from './hooks/useUserNavigation';
import { useTranslations } from '../../../i18n';
import { BackIcon } from '../common/BackIcon';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const UserStack: React.FC = () => {
    const t = useTranslations();

    return (
        <NavigationContainer>
            <User.Navigator>
                <User.Screen
                    options={{ title: t`Devices` }}
                    name={UserNavigation.DEVICES_LIST}
                    component={DevicesListScreen}
                />
                <User.Screen
                    name={UserNavigation.DEVICE_LIST_ITEM}
                    component={DeviceListItemScreen}
                    options={{ title: t`View item`, headerBackImage: BackIcon }}
                />
                <User.Screen
                    name={UserNavigation.LINK_DEVICE}
                    component={LinkDeviceScreen}
                    options={({ route }) => ({
                        header: () => <LinkDeviceScreenHeader route={route} />,
                    })}
                />
            </User.Navigator>
        </NavigationContainer>
    );
};
