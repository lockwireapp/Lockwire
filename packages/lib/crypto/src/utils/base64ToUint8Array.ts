import { atob } from 'abab';
import { isBase64 } from '@lckw/lib-utils';

export const base64ToUint8Array = (value: string) => {
    const binaryString = atob(value);
    if (binaryString === null) {
        throw new Error(
            `Failed to convert string to bytes. Reason: ${
                !isBase64(value) ? 'passed string is not base64 encoded' : 'unknown'
            }`
        );
    }
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};
