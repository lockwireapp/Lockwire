import { useEffect } from 'react';
import { useDevicesStorage } from '../../../../../../services/DevicesStorage';

export const useTitleUpdateEffect = (
    id: string | undefined,
    navigation: {
        setOptions: (props: { title: string }) => void;
    },
) => {
    const storage = useDevicesStorage();
    const item = storage.get(id);
    const itemName = item?.meta?.name || item?.id;

    useEffect(() => {
        if (itemName) {
            navigation.setOptions({ title: itemName });
        }
    }, [itemName, navigation]);
};
