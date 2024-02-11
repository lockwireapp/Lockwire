import { useEffect, useState } from 'react';

export const useQrCode = () => {
    const [isSent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string }>();
    const [data, setData] = useState<{ id: string; key: string }>();

    useEffect(() => {
        if (!isSent) {
            setLoading(true);
            setSent(true);
        }
    }, [isSent]);

    return { data, error, loading };
};
