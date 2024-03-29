import React from 'react';
import cl from 'clsx';
import { QRCodeData } from '@lckw/lib-models';
import { QRCode } from 'react-qrcode-logo';
import * as styles from '~src/popup/popup.module.css';
import { QRCodeState } from '~src/popup/QRCodeState';
import { useQrCode } from '~src/popup/useQrCode';

const LOGO_SIZE = 32;

export const Popup: React.FC = () => {
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
