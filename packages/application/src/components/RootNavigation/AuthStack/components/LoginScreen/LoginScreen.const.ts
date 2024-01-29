import { ReactNativeFirebase } from '@react-native-firebase/app';

export const INVALID_EMAIL_ERROR = 'auth/invalid-email';
export const USER_DISABLED_ERROR = 'auth/user-disabled';
export const USER_NOT_FOUND_ERROR = 'auth/user-not-found';
export const INVALID_PASSWORD_ERROR = 'auth/wrong-password';

export const isAuthError = (e: unknown): e is ReactNativeFirebase.NativeFirebaseError => {
    return !!(e as ReactNativeFirebase.NativeFirebaseError).code;
};
