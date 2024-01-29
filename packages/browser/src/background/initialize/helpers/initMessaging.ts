import { Pipe, SessionManager } from '@lckw/lib-services';
import { ChromeGCMClientPipeService } from '~src/background/services/ChromeGCMClientPipeService';
import { messageHandlers } from '~src/background/services/GCMMessagingService/handlers';
import { COMMUNICATION_PORT } from '~src/background/background.const';
import { QrCodeGetFail } from '~src/actions/QrCodeGetFail';
import { QRCodeData } from '~src/actions/QRCodeData';
import { QR_CODE_GET } from '~src/actions/QRCodeGet';
import { fetchPUSHToken } from './fetchPUSHToken';

const initPipe = async (pipe: Pipe) => {
    if (await SessionManager.isSet()) {
        const session = await SessionManager.getSession();
        pipe.init(session);
    }
};

const createPipe = async (pipe: Pipe, port: chrome.runtime.Port) => {
    try {
        await pipe.create({
            pushToken: await fetchPUSHToken(),
            onSessionIdChange: async (id, key) => port.postMessage(new QRCodeData({ id, key })),
        });
    } catch (e) {
        console.error(e);
        const message = `Failed to init session. Error: "${(e as Error)?.message || e || 'unhandled'}"`;
        port.postMessage(new QrCodeGetFail({ message }));
    }
};

const initCommunicationPort = (pipe: Pipe) => {
    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === COMMUNICATION_PORT) {
            port.onMessage.addListener(async (message) => {
                if (message.type === QR_CODE_GET) {
                    await createPipe(pipe, port);
                } else {
                    console.error('Unknown port message', message);
                }
            });
        }
    });
};

export const initMessaging = async () => {
    const pipe = new ChromeGCMClientPipeService(messageHandlers);
    await initPipe(pipe);
    initCommunicationPort(pipe);
};
