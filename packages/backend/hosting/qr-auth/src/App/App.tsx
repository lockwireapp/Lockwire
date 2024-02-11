import cl from 'clsx';
import { QRCode } from 'react-qrcode-logo';
import { QRCodeData } from '@lckw/lib-models';
import { QRCodeState } from './QRCodeState';
import styles from './App.module.css';
import { useSessionId } from './useSessionId.ts';

const LOGO_SIZE = 32;

export const App = () => {
    const { data, loading, error, initialized } = useSessionId();
    const qrCode = new QRCodeData({ id: data?.id, key: data?.key, error: error?.message });

    return (
        <div className={styles.wrap}>
            <div className={cl(loading && styles.opacity)}>
                <QRCode
                    value={qrCode.toString()}
                    size={150}
                    quietZone={8}
                    qrStyle={'dots'}
                    eyeRadius={4}
                    eyeColor={'#222'}
                />
            </div>
            <QRCodeState
                size={LOGO_SIZE}
                className={styles.state}
                error={error?.message}
                loading={loading}
                success={initialized}
            />
        </div>
    );
};
