import { isBase64 } from 'class-validator';

interface IQrCodeData {
    id: string;
    key: string;
}

interface IQrCodeError {
    error: string;
}

export type IQrCodeDataProps = Partial<IQrCodeData> &
    Partial<IQrCodeError> & {
        minLength?: number;
    };

const QR_CODE_DATA_SPAN_SYMBOL = '#';
const QR_CODE_DATA_DELIMITER_SYMBOL = '.';
const QR_CODE_DEFAULT_MINLENGTH = 64;

export class QRCodeData {
    id: string | undefined;
    key: string | undefined;
    error: string | undefined;
    private readonly minLength: number;

    constructor(props: IQrCodeDataProps) {
        this.id = props.id;
        this.key = props.key;
        this.error = props.error;
        this.minLength = props.minLength || QR_CODE_DEFAULT_MINLENGTH;
    }

    static parse(data: string): QRCodeData {
        const [id, key, error] = data.split(QR_CODE_DATA_DELIMITER_SYMBOL);
        if (key && !isBase64(key)) {
            return new QRCodeData({ error: 'Key is not recognized' });
        }
        return new QRCodeData({ id, key, error });
    }

    isValid(): this is IQrCodeData {
        return Boolean(this.id && this.key);
    }

    hasError(): this is IQrCodeError {
        return !!this.error;
    }

    toString(): string {
        const { id = '', key = '', error = '', minLength } = this;
        const data = `${error ? '' : id}${QR_CODE_DATA_DELIMITER_SYMBOL}${error ? '' : key}`;
        const span = data.length >= minLength ? 0 : minLength - data.length;
        const spanStr = Array.from({ length: span })
            .map(() => QR_CODE_DATA_SPAN_SYMBOL)
            .join('');
        return `${data}${QR_CODE_DATA_DELIMITER_SYMBOL}${error}${QR_CODE_DATA_DELIMITER_SYMBOL}${spanStr}`;
    }
}
