import { Base64String } from '@lckw/lib-utils';
import { base64ToUint8Array } from './utils/base64ToUint8Array';
import { uint8ArrayToBase64 } from './utils/uint8ArrayToBase64';

export class Key {
    constructor(public value: Uint8Array) {}

    static fromBase64String(value: string): Key {
        return new Key(base64ToUint8Array(value));
    }

    toBase64String(): Base64String {
        return uint8ArrayToBase64(this.value);
    }
}
