import { initializeApp } from 'firebase/app';
import { FIREBASE_AUTH_EMULATOR_URL, FIREBASE_CONFIG } from '~src/background/background.const';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { isDevMode } from '~src/utils/isDevMode';

export const initFirebase = () => {
    initializeApp(FIREBASE_CONFIG);
    const auth = getAuth();
    if (isDevMode()) {
        connectAuthEmulator(auth, FIREBASE_AUTH_EMULATOR_URL);
    }
};
