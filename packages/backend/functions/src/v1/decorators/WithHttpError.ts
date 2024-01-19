import { Controller } from 'tsoa';
import * as log from 'firebase-functions/logger';

class HttpError extends Error {
    readonly code: number;
}

export class GoneError extends HttpError {
    readonly code = 410;
    readonly message = 'Target resource has been permanently removed';
}

export class ForbiddenError extends HttpError {
    readonly code = 403;
    readonly message = 'Action is not allowed';
}

export class TimeoutError extends HttpError {
    readonly code = 408;
    readonly message = 'Request has not been processed in time';
}

const getStatus = (error: unknown) => {
    if (error instanceof HttpError) {
        log.error(error.message);
        return error.code;
    }
    log.error('Unhandled server error', error);
    return 500;
};

export const WithHttpError = () =>
    function (_target: Controller, _name: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]) {
            try {
                return await Promise.resolve().then(() => originalMethod.apply(this, args));
            } catch (e) {
                if (this instanceof Controller) {
                    this.setStatus(getStatus(e));
                    return void 0;
                }
                return e;
            }
        };
        return descriptor;
    };
