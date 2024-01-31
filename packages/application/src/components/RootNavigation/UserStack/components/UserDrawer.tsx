import React from 'react';
import { Avatar, Drawer } from 'react-native-paper';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { UserNavigation, userNavigationIcons, userNavigationLabels } from '../hooks/useUserNavigation';
import { useTranslate } from '../../../../i18n';
import { StyleSheet, View } from 'react-native';

export const UserDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const translate = useTranslate();
    const { navigation } = props;
    const menuItems = [{ name: UserNavigation.DEVICES_LIST }, { name: UserNavigation.LINK_DEVICE }];

    return (
        <DrawerContentScrollView {...props}>
            <Drawer.Section showDivider={false}>
                <View style={styles.profile}>
                    <Avatar.Icon size={48} icon={'account'} />
                </View>
            </Drawer.Section>
            <Drawer.Section showDivider={false}>
                {menuItems.map(({ name }) => (
                    <Drawer.Item
                        key={name}
                        icon={userNavigationIcons[name]}
                        label={translate(userNavigationLabels[name])}
                        onPress={() => navigation.navigate(name)}
                    />
                ))}
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profile: {
        paddingLeft: 24,
        paddingTop: 12,
        paddingBottom: 12,
    },
});
