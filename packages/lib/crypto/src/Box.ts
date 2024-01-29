import nacl from 'tweetnacl';
import { Base64String } from '@lckw/lib-utils';
import { base64ToUint8Array } from './utils/base64ToUint8Array';
import { uint8ArrayToBase64 } from './utils/uint8ArrayToBase64';
import { Key } from './Key';

/**
 * TODO address security issues of tweetnacl
 * https://github.com/dchest/tweetnacl-js/blob/master/README.md#security-considerations
 */
export class Box {
    constructor(private secretKey: Key) {}

    encrypt(data: Base64String, signKey: Key): { data: Base64String; nonce: Base64String } {
        const nonce = nacl.randomBytes(nacl.box.nonceLength);
        const box = nacl.box(base64ToUint8Array(data), nonce, signKey.value, this.secretKey.value);
        return {
            data: uint8ArrayToBase64(box),
            nonce: uint8ArrayToBase64(nonce),
        };
    }

    decrypt(data: Base64String, nonce: Base64String, signKey: Key): Base64String | null {
        const message = nacl.box.open(
            base64ToUint8Array(data),
            base64ToUint8Array(nonce),
            signKey.value,
            this.secretKey.value,
        );
        return message && uint8ArrayToBase64(message);
    }
}
