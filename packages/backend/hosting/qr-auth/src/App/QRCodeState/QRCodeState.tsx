import React from 'react';
import cl from 'clsx';
import styles from './QRCodeState.module.css';
import { Tooltip } from './Tooltip';

interface IQRCodeStateProps {
    className?: string;
    loading: boolean;
    error: string | undefined;
    success: boolean;
    size: number;
}

export const QRCodeState: React.FC<IQRCodeStateProps> = ({ size, className, loading, error, success }) => {
    if (!loading && !error && !success) {
        return null;
    }

    return (
        <div className={cl(styles.wrap, className)} style={{ width: `${size}px`, height: `${size}px` }}>
            {success && <span className={styles.success} />}
            {loading && <span className={styles.spinner} />}
            {error && <Tooltip text={error} />}
        </div>
    );
};
