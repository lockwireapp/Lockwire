export enum AuthEvent {
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
}

export abstract class BaseAuthService {
    abstract getIdToken(): Promise<string | null>;
    abstract signOut(): Promise<void>;
    abstract addEventListener(fn: (event: AuthEvent) => void): number;
    abstract isAuthenticated(): boolean;

    async signInAnonymously(): Promise<void> {
        throw new Error('Method "signInAnonymously" is not implemented');
    }
}
