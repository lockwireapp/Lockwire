import { useCallback, useState } from 'react';
import { IDeviceCredentials } from '../../../../../services/DevicesStorage';

export const useEncryptedChannel = () => {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (device: IDeviceCredentials) => {
        // make request to get data from device
    }, []);
    const reset = useCallback(async () => {
        setLoading(false);
        setError(void 0);
    }, []);

    return [fetchData, { reset, error, loading }] as const;
};
