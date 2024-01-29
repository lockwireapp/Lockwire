import { getAuth, signInAnonymously } from 'firebase/auth';
import type { AuthEvent } from '@lckw/lib-services/dist/src/BaseAuthService';
import type { IConfig } from '~src/background/background.const';
import { BaseAuthService } from '@lckw/lib-services';

export class FirebaseAuthService extends BaseAuthService {
    private auth = getAuth();

    constructor(private config: IConfig) {
        super();
    }

    async getIdToken(): Promise<string | null> {
        return this.auth.currentUser?.getIdToken() || null;
    }

    async signInAnonymously(): Promise<void> {
        await signInAnonymously(this.auth);
    }

    async signOut(): Promise<void> {
        await this.auth.signOut();
    }

    addEventListener(fn: (event: AuthEvent) => void): number {
        // TODO
        return 0;
    }
}
