import React from 'react';
import { Button, Divider, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDeviceListItemScreenRouteGuard } from './hooks/useDeviceListItemScreenRouteGuard';
import { IUserStackScreenComponent, UserNavigation } from '../../hooks/useUserNavigation';
import { useDevicesStorage } from '../../../../../services/DevicesStorage';
import { useTitleUpdateEffect } from './hooks/useTitleUpdateEffect';
import { useConfirmDialog } from '../../../common/ConfirmDialog';
import { useTranslations } from '../../../../../i18n';

export const DeviceListItemScreen: IUserStackScreenComponent<UserNavigation.DEVICE_LIST_ITEM> = ({
    route,
    navigation,
}) => {
    const id = route.params.id;
    const theme = useTheme();
    const t = useTranslations();
    const storage = useDevicesStorage();
    const confirmDialog = useConfirmDialog();
    const { meta } = storage.get(id) || {};

    useTitleUpdateEffect(id, navigation);
    useDeviceListItemScreenRouteGuard(id, navigation);

    const data = [
        { label: 'Name', value: meta?.name },
        { label: 'Description', value: meta?.description },
        { label: 'Device', value: meta?.device },
        { label: 'Platform', value: meta?.platform },
        { label: 'Date added', value: meta?.creationDate },
    ];

    const handleItemDelete = (itemId: string) => () => {
        confirmDialog.open({
            title: 'Confirm device removal',
            text: 'You about to remove device. Are you sure?',
            onConfirm: async () => {
                storage.remove(itemId);
                console.log('kek');
            },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {data.map(({ label, value }) => (
                    <React.Fragment key={label}>
                        <Text style={styles.text}>
                            {label}: {value}
                        </Text>
                        <Divider />
                    </React.Fragment>
                ))}
            </View>

            <View style={styles.row}>
                <Button mode={'contained'}>Send</Button>
            </View>

            <View style={styles.row}>
                {id && (
                    <Button mode={'contained'} buttonColor={theme.colors.error} onPress={handleItemDelete(id)}>
                        {t`Delete`}
                    </Button>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    row: {
        marginBottom: 20,
    },
    text: {
        marginTop: 16,
        marginBottom: 16,
    },
});
