import { initializeApp } from 'firebase/app';
import { FIREBASE_AUTH_EMULATOR_URL, FIREBASE_CONFIG } from '~src/background/background.const';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { isDevMode } from '~src/utils/isDevMode';

export const initFirebase = async () => {
    initializeApp(FIREBASE_CONFIG);
    const auth = getAuth();

    if (auth.currentUser) {
        await auth.currentUser.getIdToken(true);
    }

    if (isDevMode()) {
        connectAuthEmulator(auth, FIREBASE_AUTH_EMULATOR_URL);
    }
};
