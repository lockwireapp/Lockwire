import type { Action } from '~src/interfaces/Action';

export const QR_CODE_GET_FAIL = '[Qr code] Failed to get data';

export class QrCodeGetFail implements Action {
    readonly type = QR_CODE_GET_FAIL;

    constructor(public error: { message: string }) {}
}
