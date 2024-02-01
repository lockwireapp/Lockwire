import React from 'react';
import { Avatar, Drawer, TouchableRipple } from 'react-native-paper';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { UserNavigation, userNavigationIcons, userNavigationLabels } from '../hooks/useUserNavigation';
import { useTemplateTranslation, useTranslate } from '../../../../i18n';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../../../auth/useAuth';

export const UserDrawer: React.FC<DrawerContentComponentProps> = ({ navigation, ...props }) => {
    const auth = useAuth();
    const translate = useTranslate();
    const t = useTemplateTranslation();

    const menuItems = [{ name: UserNavigation.DEVICES_LIST }, { name: UserNavigation.LINK_DEVICE }];

    return (
        <DrawerContentScrollView {...props}>
            <Drawer.Section showDivider={false}>
                <TouchableRipple onPress={() => console.log('TODO Navigate to profile')}>
                    <View style={styles.profile}>
                        <Avatar.Icon size={48} icon={'account'} />
                    </View>
                </TouchableRipple>
            </Drawer.Section>
            <Drawer.Section>
                {menuItems.map(({ name }) => (
                    <Drawer.Item
                        key={name}
                        icon={userNavigationIcons[name]}
                        label={translate(userNavigationLabels[name])}
                        onPress={() => navigation.navigate(name)}
                    />
                ))}
            </Drawer.Section>
            <Drawer.Section showDivider={false}>
                <Drawer.Item icon={'exit-to-app'} label={t`Sign out`} onPress={() => auth.signOut()} />
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
