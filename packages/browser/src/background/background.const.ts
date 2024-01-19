export const COMMUNICATION_PORT = 'COMMUNICATION_PORT';

export const FIREBASE_AUTH_EMULATOR_URL = 'http://127.0.0.1:9099';

export const FIREBASE_CONFIG = {
    apiKey: process.env.PLASMO_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.PLASMO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PLASMO_PUBLIC_FIREBASE_APP_ID,
};

export interface IConfig {
    apiUrl: string;
    messagingSenderId: string;
}

export const getConfig = (): IConfig => {
    const messagingSenderId = FIREBASE_CONFIG.messagingSenderId;
    const apiUrl = process.env.PLASMO_PUBLIC_SERVER_URL;

    if (!messagingSenderId) {
        throw new Error('No firebase "messagingSenderId" parameter provided');
    }

    if (!apiUrl) {
        throw new Error('No firebase "apiUrl" parameter provided');
    }

    return { messagingSenderId, apiUrl };
};
