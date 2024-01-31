import React from 'react';
import { Drawer } from 'react-native-paper';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { UserNavigation, userNavigationLabels } from '../hooks/useUserNavigation';
import { useTranslate } from '../../../../i18n';

export const UserDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const translate = useTranslate();
    const { navigation } = props;
    const menuItems = [{ name: UserNavigation.DEVICES_LIST }, { name: UserNavigation.LINK_DEVICE }];

    return (
        <DrawerContentScrollView {...props}>
            <Drawer.Section>
                {menuItems.map(({ name }) => (
                    <Drawer.Item
                        key={name}
                        label={translate(userNavigationLabels[name])}
                        onPress={() => navigation.navigate(name)}
                    />
                ))}
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};
