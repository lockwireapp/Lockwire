import { FIREBASE_CONFIG } from '~src/background/background.const';

export const fetchPUSHToken = async (): Promise<string> => {
    return new Promise((res, rej) => {
        const id = FIREBASE_CONFIG.messagingSenderId;
        if (id) {
            chrome.gcm.register([id], (registrationToken) => {
                if (chrome.runtime.lastError) {
                    rej(chrome.runtime.lastError);
                } else {
                    res(registrationToken);
                }
            });
        } else {
            throw new Error('messagingSenderId is not defined');
        }
    });
};
