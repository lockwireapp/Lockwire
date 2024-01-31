import { APIProviderV1 } from '@lckw/api';
import { objectToBase64 } from '@lckw/lib-utils';
import { Box, Crypto, Key } from '@lckw/lib-crypto';
import { MessageDataDTO, MessageType, SessionDevice, SessionDevicePlatform } from '@lckw/lib-models';
import { useDevicesStorage } from '../../../../../services/DevicesStorage';
import { useAppConfig } from '../../../../../AppConfig';
import { useAuth } from '../../../../../auth/useAuth';
import { getPushToken } from './getPushToken';

export const useInitSession = () => {
    const auth = useAuth();
    const config = useAppConfig();
    const storage = useDevicesStorage();

    return async (to: string, senderPublicKey: string) => {
        const pushToken = await getPushToken();
        const keypair = Crypto.generateKeyPair();
        const api = new APIProviderV1(config.apiUrl, auth);
        const box = new Box(keypair.secretKey);
        const payload = new MessageDataDTO({ type: MessageType.CONNECT, value: {} });
        const { data, nonce } = box.encrypt(objectToBase64(payload), Key.fromBase64String(senderPublicKey));
        const message = { to, pushToken, key: keypair.publicKey.toBase64String(), data, nonce };
        const { key, error } = await api.connect(message);
        if (error) {
            throw new Error(error?.message);
        }

        await storage.set({
            id: to,
            key: senderPublicKey,
            serverSign: key,
            secretKey: keypair.secretKey.toBase64String(),
            meta: {
                name: '',
                description: '',
                device: SessionDevice.UNKNOWN,
                platform: SessionDevicePlatform.UNKNOWN,
                creationDate: new Date().toISOString(),
                loaded: false,
            },
        });
    };
};
