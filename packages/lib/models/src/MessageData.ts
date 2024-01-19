import { IsEnum, isObject, IsObject, validateSync } from 'class-validator';
import { IDeviceMetadata } from './DeviceMetadata';
import { objectToBase64 } from '@lckw/lib-utils';
import { Base64String } from '@lckw/lib-utils';
import isNil from 'lodash/isNil';
import { IMessage } from './Message';

export enum MessageType {
    CONNECT = 'CONNECT',
    GET_METADATA = 'GET_METADATA',
    METADATA = 'METADATA',
    GET_TARGET = 'GET_TARGET',
    TARGET = 'TARGET',
}

interface MetadataMessage {
    type: MessageType.METADATA;
    value: IDeviceMetadata;
}

export type IMessageDataValue = MetadataMessage;

export interface IMessageData {
    type: MessageType;
    value: IMessageDataValue;
}

export class MessageData implements IMessageData {
    @IsEnum(MessageType)
    type: MessageType;

    @IsObject()
    value: IMessageDataValue; // TODO add types derived from on type
}

export class MessageDataDTO extends MessageData {
    constructor(props: IMessageData) {
        super();
        this.type = props.type;
        this.value = props.value;
    }

    static create(props: unknown): MessageDataDTO {
        if (!isObject(props)) {
            throw new Error(`Failed to create MessageDataDTO. Unsupported value "${props}" has been used as source`);
        }
        const message = new MessageDataDTO(props as IMessageData);
        const errors = validateSync(message, { stopAtFirstError: false });

        if (errors.length) {
            throw new Error(`Message data failed to pass validation. Errors: ${JSON.stringify(errors)}`);
        }
        return message;
    }

    toPlainObject(): Record<keyof IMessage, string> {
        const obj = {
            type: this.type,
            value: this.value,
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
