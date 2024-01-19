import type { Action } from '~src/interfaces/Action';

export const QR_CODE_DATA = '[QR code] Data';

export interface IQrCodeData {
    id: string;
    key: string;
}

export class QRCodeData implements Action<IQrCodeData> {
    readonly type = QR_CODE_DATA;

    constructor(public readonly payload: IQrCodeData) {}
}
