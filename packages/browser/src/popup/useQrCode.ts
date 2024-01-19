import { useEffect, useRef, useState } from 'react';
import { COMMUNICATION_PORT } from '~src/background/background.const';
import { type IQrCodeData, QR_CODE_DATA } from '~src/actions/QRCodeData';
import { QR_CODE_GET_FAIL } from '~src/actions/QrCodeGetFail';
import { QR_CODE_EXPIRE } from '~src/actions/QRCodeExpire';
import { QRCodeGet } from '~src/actions/QRCodeGet';

export const useQrCode = () => {
    const [isSent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string }>();
    const [data, setData] = useState<IQrCodeData>();
    const port = useRef(chrome.runtime.connect({ name: COMMUNICATION_PORT }));

    useEffect(() => {
        if (!isSent) {
            port.current.postMessage(new QRCodeGet());
            setLoading(true);
            setSent(true);
        }

        port.current.onMessage.addListener((action) => {
            switch (action.type) {
                case QR_CODE_DATA:
                    setData(action.payload);
                    setError(void 0);
                    setLoading(false);
                    break;
                case QR_CODE_GET_FAIL: {
                    setError(action.error);
                    break;
                }
                case QR_CODE_EXPIRE:
                    setSent(false);
                    break;
                default:
                    setError({ message: 'Unhandled error' });
            }
            setLoading(false);
        });
    }, [isSent]);

    return { data, error, loading };
};
