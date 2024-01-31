import React, { useState } from 'react';
import { AnimatedFAB, List, Text } from 'react-native-paper';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { IUserStackScreenComponent, UserNavigation, useUserNavigation } from '../../hooks/useUserNavigation';
import { useDevicesStorage } from '../../../../../services/DevicesStorage';
import { DeviceListItemActions } from './components/DeviceListItemActions';
import { DeviceTypeIcon } from './components/DeviceTypeIcon';
import { useTemplateTranslation } from '../../../../../i18n';

const AddDeviceButton: React.FC<{ extended: boolean }> = ({ extended }) => {
    const t = useTemplateTranslation();
    const navigator = useUserNavigation();

    return (
        <AnimatedFAB
            icon={'qrcode-scan'}
            label={t`Add new device`}
            extended={extended}
            onPress={() => navigator.navigate(UserNavigation.LINK_DEVICE, { from: UserNavigation.DEVICES_LIST })}
            animateFrom={'right'}
            style={{ position: 'absolute', bottom: 20, right: 20 }}
            iconMode={'static'}
            visible
        />
    );
};

export const DevicesListScreen: IUserStackScreenComponent<UserNavigation.DEVICES_LIST> = () => {
    const t = useTemplateTranslation();
    const storage = useDevicesStorage();
    const navigator = useUserNavigation();
    const [isFABExtended, setFABExtended] = useState(true);

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setFABExtended(currentScrollPosition <= 0);
    };

    const isEmpty = storage.list().length === 0;

    return (
        <View style={styles.container}>
            {isEmpty ? (
                <View style={styles.emptyList}>
                    <Text>{t`No devices`}</Text>
                </View>
            ) : (
                <ScrollView onScroll={onScroll}>
                    {storage.list().map(({ id, meta }, index) => (
                        <List.Item
                            key={id}
                            title={`Device ${index}`}
                            description={meta?.description || id}
                            left={() => <DeviceTypeIcon value={meta} />}
                            right={() => <DeviceListItemActions id={id} />}
                            onPress={() => navigator.navigate(UserNavigation.DEVICE_LIST_ITEM, { id })}
                            style={styles.listItem}
                        />
                    ))}
                </ScrollView>
            )}
            <AddDeviceButton extended={isFABExtended} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 0,
        margin: 0,
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
    },
});
