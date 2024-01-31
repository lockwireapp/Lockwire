import getFirebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, useContext } from 'react';
import { AuthEvent, BaseAuthService } from '@lckw/lib-services';

type IAuthEventSubscriber = (event: AuthEvent) => void;

class FirebaseAuthService extends BaseAuthService {
    private subscribers: IAuthEventSubscriber[] = [];

    constructor(private auth: FirebaseAuthTypes.Module) {
        super();
    }

    async getIdToken(): Promise<string | null> {
        return this.auth.currentUser?.getIdToken(true) || null;
    }

    async signOut(): Promise<void> {
        await this.auth.signOut();
        this.emitEvent(AuthEvent.SIGN_OUT);
        this.subscribers = [];
    }

    isAuthenticated(): boolean {
        return !!this.auth.currentUser;
    }

    async signInWithEmailAndPassword(email: string, password: string) {
        const user = await this.auth.signInWithEmailAndPassword(email, password);
        this.emitEvent(AuthEvent.SIGN_IN);
        return user;
    }

    addEventListener(fn: IAuthEventSubscriber): number {
        return this.subscribers.push(fn) - 1;
    }

    removeEventListener(index: number): void {
        delete this.subscribers[index];
    }

    emitEvent(event: AuthEvent): void {
        this.subscribers.filter(Boolean).forEach((fn) => fn(event));
    }
}

const firebaseAuth = getFirebaseAuth();
const service = new FirebaseAuthService(firebaseAuth);
const AuthContext = createContext<FirebaseAuthService>(service);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AuthContext.Provider value={service}>{children}</AuthContext.Provider>;
};
