import { BaseAuthService } from '@lckw/lib-services';
import type { IConfig } from '~src/background/background.const';
import type { AuthEvent } from '@lckw/lib-services/dist/src/BaseAuthService';

export class FirebaseAuthService extends BaseAuthService {
    private _token: string | null = null;

    constructor(private config: IConfig) {
        super();
    }

    async getIdToken(): Promise<string | null> {
        return this._token;
    }

    async signInAnonymously(): Promise<void> {
        // sign in firebase
        // set token
    }

    async signOut(): Promise<void> {
        // revoke token;
        this._token = null;
    }

    addEventListener(fn: (event: AuthEvent) => void): number {
        return 0;
    }
}
