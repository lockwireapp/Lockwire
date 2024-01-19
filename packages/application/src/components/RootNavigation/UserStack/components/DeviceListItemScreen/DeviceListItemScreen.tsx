import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDeviceListItemScreenRouteGuard } from './hooks/useDeviceListItemScreenRouteGuard';
import { IUserStackScreenComponent, UserNavigation } from '../../hooks/useUserNavigation';
import { useDevicesStorage } from '../../../../../services/DevicesStorage';
import { useTitleUpdateEffect } from './hooks/useTitleUpdateEffect';
import { useTranslations } from '../../../../../i18n';
import { useConfirmDialog } from '../../../common/ConfirmDialog';

export const DeviceListItemScreen: IUserStackScreenComponent<UserNavigation.DEVICE_LIST_ITEM> = ({
    route,
    navigation,
}) => {
    const id = route.params.id;
    const storage = useDevicesStorage();
    const t = useTranslations();
    const theme = useTheme();
    const confirmDialog = useConfirmDialog();

    useTitleUpdateEffect(id, navigation);
    useDeviceListItemScreenRouteGuard(id, navigation);

    return (
        <View style={styles.container}>
            {id && (
                <Button
                    mode={'contained'}
                    buttonColor={theme.colors.error}
                    onPress={() => {
                        confirmDialog.open({
                            title: 'Confirm device removal',
                            text: 'You about to remove device. Are you sure?',
                            onConfirm: async () => {
                                storage.remove(id);
                                console.log('kek');
                            },
                        });
                    }}
                >
                    {t`Delete`}
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: '20%',
    },
});
