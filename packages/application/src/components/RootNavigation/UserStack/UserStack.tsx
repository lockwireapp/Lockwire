import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DeviceListItemScreen } from './components/DeviceListItemScreen';
import { DevicesListScreen } from './components/DevicesListScreen';
import { LinkDeviceScreen } from './components/LinkDeviceScreen';
import { IUserStackParamList, IUserStackRoute, User, UserNavigation } from './hooks/useUserNavigation';
import { useTranslations } from '../../../i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { FloatingHeader } from '../common/FloatingHeader';
import { DefaultHeader } from '../common/DefaultHeader';

const optionsFactory =
    (title: string, options: { floating?: boolean } = {}) =>
    (props: { route: IUserStackRoute; navigation: StackNavigationProp<IUserStackParamList, UserNavigation> }) => {
        const from = props.route.params?.from;
        const navigateBack = from && (() => props.navigation.navigate(from, {}));

        return {
            header: () => {
                const Component = options.floating ? FloatingHeader : DefaultHeader;
                return <Component title={title} onNavigateBack={navigateBack} />;
            },
        };
    };

export const UserStack: React.FC = () => {
    const t = useTranslations();

    return (
        <NavigationContainer>
            <User.Navigator>
                <User.Screen
                    name={UserNavigation.DEVICES_LIST}
                    component={DevicesListScreen}
                    options={optionsFactory(t`Devices`)}
                />
                <User.Screen
                    name={UserNavigation.DEVICE_LIST_ITEM}
                    component={DeviceListItemScreen}
                    options={optionsFactory(t`View item`)}
                />
                <User.Screen
                    name={UserNavigation.LINK_DEVICE}
                    component={LinkDeviceScreen}
                    options={optionsFactory(t`Add device`, { floating: true })}
                />
            </User.Navigator>
        </NavigationContainer>
    );
};
