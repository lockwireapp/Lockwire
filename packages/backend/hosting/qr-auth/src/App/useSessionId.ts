import { useEffect, useState } from 'react';

export const useSessionId = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState<{ message: string }>();
    const [data, setData] = useState<{ id: string; key: string }>();

    const onError = (e: unknown) => {
        setError({ message: (e as Error).message });
    };

    const fetchSessionId = async () => {
        setLoading(true);
        try {
            setTimeout(() => {
                setData({ id: 'abc', key: 'def' });
                setLoading(false);
                setLoaded(true);

                setTimeout(() => setInitialized(true), 1000);
            }, 1000);
        } catch (e) {
            setLoading(false);
            onError(e);
        }
    };

    useEffect(() => {
        if (!loaded && !loading && !error) {
            fetchSessionId().catch(onError);
        }
    });

    const retry = () => {
        setLoaded(false);
        setError(void 0);
    };

    return { loading, error, data, initialized, retry };
};
