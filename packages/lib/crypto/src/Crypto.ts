import nacl from 'tweetnacl';
import { Key } from './Key';

export interface Keypair {
    publicKey: Key;
    secretKey: Key;
}

export class Crypto {
    static setPRNG(prng: (x: Uint8Array, n: number) => void) {
        try {
            nacl.randomBytes(0);
        } catch (e) {
            // define PRGN manually if it's not defined by environment
            nacl.setPRNG(prng);
        }
    }

    static generateKeyPair(): Keypair {
        const { publicKey, secretKey } = nacl.box.keyPair();
        return {
            publicKey: new Key(publicKey),
            secretKey: new Key(secretKey),
        };
    }
}
