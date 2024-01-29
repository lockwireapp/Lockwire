import { registerRootComponent } from 'expo';
import getAuth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import functions from '@react-native-firebase/functions';
import { config } from './AppConfig';
import App from './App';

if (__DEV__) {
    console.log('[Firebase] Connecting to simulators');
    const [, apiHost] = config.apiUrl.match(/(http:\/\/.+):/) || [];
    functions().useEmulator(apiHost, 5001);
    database().useEmulator(apiHost, 9000);
    getAuth().useEmulator(`${apiHost}:9099`);
}

registerRootComponent(App);
