import React from 'react';
import styles from './Tooltip.module.css';

interface ITooltipProps {
    text: string;
    children?: React.ReactNode;
}

export const Tooltip: React.FC<ITooltipProps> = ({ text, children }) => {
    return (
        <div className={styles.tooltip} data-tooltip-text={text}>
            {children}
        </div>
    );
};
