import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DeviceListItemScreen } from './components/DeviceListItemScreen';
import { DevicesListScreen } from './components/DevicesListScreen';
import { LinkDeviceScreen } from './components/LinkDeviceScreen';
import { User, UserNavigation } from './hooks/useUserNavigation';
import { UserDrawer } from './components/UserDrawer';
import { useUserStackScreenOptions } from './hooks/useUserStackScreenOptions';

export const UserStack: React.FC = () => {
    const optionsFactory = useUserStackScreenOptions();

    return (
        <NavigationContainer>
            <User.Navigator drawerContent={(props) => <UserDrawer {...props} />}>
                <User.Screen
                    name={UserNavigation.DEVICES_LIST}
                    component={DevicesListScreen}
                    options={optionsFactory()}
                />
                <User.Screen
                    name={UserNavigation.DEVICE_LIST_ITEM}
                    component={DeviceListItemScreen}
                    options={optionsFactory()}
                />
                <User.Screen
                    name={UserNavigation.LINK_DEVICE}
                    component={LinkDeviceScreen}
                    options={optionsFactory({ floating: true, fromRoute: UserNavigation.DEVICES_LIST })}
                />
            </User.Navigator>
        </NavigationContainer>
    );
};
