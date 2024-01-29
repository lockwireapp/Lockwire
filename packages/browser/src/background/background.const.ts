export const COMMUNICATION_PORT = 'COMMUNICATION_PORT';

export const FIREBASE_AUTH_EMULATOR_URL = 'http://127.0.0.1:9099';

export const FIREBASE_CONFIG = {
    projectId: 'lockwire-9561c',
    messagingSenderId: '356695135711',
    apiKey: process.env.PLASMO_PUBLIC_FIREBASE_API_KEY,
    appId: '1:356695135711:web:4aafb6154b3e2c0057606a',
    authDomain: 'lockwire-9561c.firebaseapp.com',
    storageBucket: 'lockwire-9561c.appspot.com',
};

export interface IConfig {
    apiUrl: string;
    messagingSenderId: string;
    apiKey: string;
}

export const getConfig = (): IConfig => {
    const messagingSenderId = FIREBASE_CONFIG.messagingSenderId;
    const apiUrl = process.env.PLASMO_PUBLIC_SERVER_URL;
    const apiKey = process.env.PLASMO_PUBLIC_FIREBASE_API_KEY;

    if (!messagingSenderId) {
        throw new Error('No firebase "messagingSenderId" parameter provided');
    }

    if (!apiUrl) {
        throw new Error('No firebase "apiUrl" parameter provided');
    }

    if (!apiKey) {
        throw new Error('No firebase "apiKey" parameter provided');
    }

    return { messagingSenderId, apiUrl, apiKey };
};
