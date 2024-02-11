import cl from 'clsx';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { QRCodeData } from '@lckw/lib-models';
import { useQrCode } from '../useQrCode';
import { QRCodeState } from './QRCodeState';
import styles from './App.module.css';

const LOGO_SIZE = 32;

export const App = () => {
    const { data, loading, error } = useQrCode();
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
            <QRCodeState size={LOGO_SIZE} className={styles.state} error={error?.message} loading={loading} />
        </div>
    );
};
