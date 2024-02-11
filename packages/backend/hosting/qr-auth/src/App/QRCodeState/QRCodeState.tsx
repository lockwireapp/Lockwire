import React from 'react';
import cl from 'clsx';
import styles from './QRCodeState.module.css';
import { Tooltip } from '../components/Tooltip';

interface IQRCodeStateProps {
    className?: string;
    loading: boolean;
    error: string | undefined;
    size: number;
}

export const QRCodeState: React.FC<IQRCodeStateProps> = ({ size, className, loading, error }) => {
    if (!loading && !error) {
        return null;
    }

    return (
        <div className={cl(styles.wrap, className)} style={{ width: `${size}px`, height: `${size}px` }}>
            {loading && <span className={styles.spinner} />}
            {error && <Tooltip text={error} />}
        </div>
    );
};
