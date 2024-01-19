import { objectToBase64 } from '@lckw/lib-utils';
import { Box, Crypto, Key } from '@lckw/lib-crypto';
import auth from '@react-native-firebase/auth';
import { IDeviceMetadata, MessageType, SessionDevice, SessionDevicePlatform } from '@lckw/lib-models';
import { useDevicesStorage } from '../../../../../services/DevicesStorage';
import { useEncryptedChannel } from './useEncryptedChannel';
import { getPushToken } from './getPushToken';
// import { connect } from '../../api';

const useCurrentUser = () => {
    const user = auth().currentUser;
    if (!user) {
        auth().signOut().catch(console.error);
        throw new Error('Cannot init session. No active user');
    }
    return user;
};

export const useInitSession = () => {
    const user = useCurrentUser();
    const [fetchData, dataRequest] = useEncryptedChannel();
    const storage = useDevicesStorage();

    return async (to: string, senderPublicKey: string) => {
        const pushToken = await getPushToken();
        const keypair = Crypto.generateKeyPair();

        const box = new Box(keypair.secretKey);
        const payload = { type: MessageType.CONNECT };
        const { data, nonce } = box.encrypt(objectToBase64(payload), Key.fromString(senderPublicKey));
        const message = { to, pushToken, key: keypair.publicKey.toString(), data, nonce };
        // TODO
        const { key, error } = { key: '', error: void 0 as any }; // await connect(message, user);

        // load meta
        if (error || dataRequest.error) {
            throw new Error(error?.message || dataRequest.error);
        }

        const meta: IDeviceMetadata = {
            name: 'TODO',
            device: SessionDevice.GOOGLE_CHROME,
            platform: SessionDevicePlatform.ANDROID,
            description: 'TODO'
        };

        await storage.set({
            id: to,
            key: senderPublicKey,
            serverSign: key,
            secretKey: keypair.secretKey.toString(),
            meta
        });
    };
};
