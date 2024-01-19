import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export const getPushToken = async () => {
    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
            });
        }

        const status = await Notifications.getPermissionsAsync();
        const finalStatus = status.granted ? status : await Notifications.requestPermissionsAsync();

        if (finalStatus.status !== 'granted') {
            return;
        }

        const token = await Notifications.getDevicePushTokenAsync();
        return token.data;
    } catch (error) {
        console.error('Error getting PUSH token:', error);
    }
};
