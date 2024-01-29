
export enum AuthEvent {
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT'
}

export abstract class BaseAuthService {
    abstract getIdToken(): Promise<string|null>;
    abstract signInAnonymously(): Promise<void>;
    abstract signOut(): Promise<void>
    abstract addEventListener(fn: (event: AuthEvent) => void): number;
}
