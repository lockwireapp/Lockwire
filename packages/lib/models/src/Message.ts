import isNil from 'lodash/isNil';
import { Base64String, objectToBase64 } from '@lckw/lib-utils';
import { isObject, IsString, validateSync } from 'class-validator';

export interface IEncryptedMessage {
    data: Base64String;
    nonce: string;
}

export interface IMessage extends IEncryptedMessage {
    id: string;
    from: string;
    key?: Base64String;
}

export class Message implements IMessage {
    @IsString()
    id: string;

    @IsString()
    from: string;

    @IsString()
    key: Base64String | undefined;

    @IsString()
    data: Base64String;

    @IsString()
    nonce: string;
}

export class MessageDTO extends Message {
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
            messageId: this.id,
            senderId: this.from,
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
