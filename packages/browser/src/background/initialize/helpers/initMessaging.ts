import { Transport, SessionManager } from '@lckw/lib-services';
import { ChromeGCMClientTransportService } from '~src/background/services/ChromeGCMClientTransportService';
import { messageHandlers } from '~src/background/services/GCMMessagingService/handlers';
import { COMMUNICATION_PORT } from '~src/background/background.const';
import { QrCodeGetFail } from '~src/actions/QrCodeGetFail';
import { QRCodeData } from '~src/actions/QRCodeData';
import { QR_CODE_GET } from '~src/actions/QRCodeGet';
import { fetchPUSHToken } from './fetchPUSHToken';

const createTransport = async (transport: Transport, port: chrome.runtime.Port) => {
    try {
        await transport.create({
            pushToken: await fetchPUSHToken(),
            onSessionIdChange: async (id, key) => port.postMessage(new QRCodeData({ id, key })),
        });
    } catch (e) {
        console.error(e);
        const message = `Failed to init session. ${(e as Error)?.message || e || 'Unknown error'}`;
        port.postMessage(new QrCodeGetFail({ message }));
    }
};

const initCommunicationPort = (transport: Transport) => {
    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === COMMUNICATION_PORT) {
            port.onMessage.addListener(async (message) => {
                if (message.type === QR_CODE_GET) {
                    const hasSession = await SessionManager.isSet();
                    if (!hasSession) {
                        await createTransport(transport, port);
                    } else {
                        port.postMessage(new QrCodeGetFail({ message: 'Session exists' }));
                    }
                } else {
                    console.error('Unknown port message', message);
                    // TODO
                }
            });
        }
    });
};

export const initMessaging = async () => {
    const transport = new ChromeGCMClientTransportService(messageHandlers);
    if (await SessionManager.isSet()) {
        const session = await SessionManager.getSession();
        transport.init(session);
    }
    initCommunicationPort(transport);
};
