import { btoa } from 'abab';
import { Base64String } from '@lckw/lib-utils';

export const uint8ArrayToBase64 = (value: Uint8Array): Base64String => {
    const binaryString = value.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const result = btoa(binaryString);
    if (result === null) {
        throw new Error('Failed to convert bytes to string');
    }
    return result as Base64String;
};
