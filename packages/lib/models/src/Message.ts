import isNil from 'lodash/isNil';
import { Base64String, objectToBase64 } from '@lckw/lib-utils';
import { isObject, IsString, validateSync } from 'class-validator';

export interface IEncryptedMessage {
    data: Base64String;
    nonce: Base64String;
}

export interface IMessage extends IEncryptedMessage {
    id: string;
    from: string;
    key?: Base64String;
}

export abstract class Message implements IMessage {
    @IsString()
    abstract id: string;

    @IsString()
    abstract from: string;

    @IsString()
    abstract key: Base64String | undefined;

    @IsString()
    abstract data: Base64String;

    @IsString()
    abstract nonce: Base64String;
}

export class MessageDTO extends Message {
    id: string;
    from: string;
    key: Base64String | undefined;
    data: Base64String;
    nonce: Base64String;

    constructor(props: IMessage) {
        super();
        this.id = props.id;
        this.from = props.from;
        this.key = props.key;
        this.nonce = props.nonce;
        this.data = props.data;
    }

    static create(props: unknown): MessageDTO {
        if (!isObject(props)) {
            throw new Error(`Failed to create MessageDTO. Unsupported value "${props}" has been used as source`);
        }
        const message = new MessageDTO(props as IMessage);
        const errors = validateSync(message, { stopAtFirstError: false });

        if (errors.length) {
            throw new Error(`Message failed to pass validation. Errors: ${JSON.stringify(errors)}`);
        }
        return message;
    }

    toPlainObject(): Record<keyof IMessage, string> {
        const obj = {
            id: this.id,
            from: this.from,
            key: this.key,
            nonce: this.nonce,
            data: this.data,
        };

        return Object.fromEntries(Object.entries(obj).filter(([_key, value]) => !isNil(value))) as Record<
            string,
            string
        >;
    }

    toBase64(): Base64String {
        return objectToBase64(this.toPlainObject());
    }
}
