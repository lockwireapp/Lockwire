import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import isString from 'lodash/isString';
import * as log from 'firebase-functions/logger';

export const JWT_AUTH = 'jwt';

export const AUTH_SCOPES = {
    VAULT: 'VAULT',
    CLIENT: 'CLIENT',
};

const JWT_AUTH_HEADER_NAME = 'Authorization';

export class AuthenticationError extends Error {
    constructor(public status: number) {
        super();
    }
}

const getJWTToken = (request: Request) => {
    const value = request.headers[JWT_AUTH_HEADER_NAME.toLowerCase()];
    if (isString(value)) {
        return value.trim().split('Bearer ')[1] || null;
    }
    return null;
};

export const expressAuthentication = (request: Request, securityName: string, scopes?: string[]): Promise<void> => {
    if (securityName === JWT_AUTH) {
        return new Promise(async (res, rej) => {
            const token = getJWTToken(request);
            if (token) {
                const auth = getAuth();
                try {
                    console.log({ securityName, scopes, token });
                    const decodedToken = await auth.verifyIdToken(token);
                    const userId = decodedToken.uid;
                    console.log({ userId });
                    // TODO check permanent user
                    // TODO check user scope
                    res();
                } catch (e) {
                    log.error(e);
                }
            }
            rej(new AuthenticationError(401));
        });
    }

    return Promise.reject();
};
