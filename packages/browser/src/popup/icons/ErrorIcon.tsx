import React from 'react';
import type { ISvgIcon } from '~src/popup/icons/interfaces/ISvgIcon';

export const ErrorIcon: React.FC<ISvgIcon> = ({ size, className }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={'#000'}
            height={size}
            width={size}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
        </svg>
    );
};
