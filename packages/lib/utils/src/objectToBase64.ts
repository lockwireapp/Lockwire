import { btoa } from 'abab';
import { Base64String } from './types';

export const objectToBase64 = (value: object): Base64String => {
    const message = btoa(JSON.stringify(value));
    if (!message) {
        throw new Error('Failed to convert Message to Base64');
    }
    return message as Base64String;
};
