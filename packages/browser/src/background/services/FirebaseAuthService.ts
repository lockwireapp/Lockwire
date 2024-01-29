import { getAuth, inMemoryPersistence, setPersistence, signInAnonymously } from 'firebase/auth';
import type { IConfig } from '~src/background/background.const';
import { AuthEvent, BaseAuthService } from '@lckw/lib-services';

export class FirebaseAuthService extends BaseAuthService {
    private auth = getAuth(); // TODO pass in constructor

    constructor(private config: IConfig) {
        super();
    }

    async getIdToken(): Promise<string | null> {
        return this.auth.currentUser?.getIdToken(true) || null;
    }

    async signInAnonymously(): Promise<void> {
        await setPersistence(this.auth, inMemoryPersistence);
        await signInAnonymously(this.auth);
    }

    async signOut(): Promise<void> {
        await this.auth.signOut();
    }

    isAuthenticated(): boolean {
        return !!this.auth.currentUser;
    }

    addEventListener(fn: (event: AuthEvent) => void): number {
        // TODO
        return 0;
    }
}
