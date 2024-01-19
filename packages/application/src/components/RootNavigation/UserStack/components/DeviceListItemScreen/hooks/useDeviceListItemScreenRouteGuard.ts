import { UserNavigation } from '../../../hooks/useUserNavigation';
import { useDevicesStorage } from '../../../../../../services/DevicesStorage';
import { useEffect } from 'react';

export const useDeviceListItemScreenRouteGuard = (
    id: string | undefined,
    navigation: {
        navigate: (route: UserNavigation, params: object) => void;
    },
) => {
    const storage = useDevicesStorage();
    const hasItem = storage.has(id);
    useEffect(() => {
        if (!hasItem) {
            navigation.navigate(UserNavigation.DEVICES_LIST, {});
        }
    });
};
