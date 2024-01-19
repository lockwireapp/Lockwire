import type { Action } from '~src/interfaces/Action';

export const QR_CODE_EXPIRE = '[QR code] expire';

export class QRCodeExpire implements Action {
    readonly type = QR_CODE_EXPIRE;
}
