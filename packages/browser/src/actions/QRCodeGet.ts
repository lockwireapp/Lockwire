import type { Action } from '~src/interfaces/Action';

export const QR_CODE_GET = '[QR code] get data';

export class QRCodeGet implements Action {
    type = QR_CODE_GET;
}
