import { Controller } from 'tsoa';
import * as log from 'firebase-functions/logger';

export const WithLog = <T>(getAdditionalInfo: (args: T[]) => string = () => '') =>
    function (_target: Controller, name: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]) {
            log.info(`Calling "${name}" ${getAdditionalInfo(args as T[])} at ${new Date()}`.trim());
            return await originalMethod.apply(this, args);
        };
        return descriptor;
    };
