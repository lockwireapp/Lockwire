import { registerRootComponent } from 'expo';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import functions from '@react-native-firebase/functions';
import { config } from './AppConfig';
import App from './App';

console.log(config);

if (__DEV__) {
    console.log('[Firebase] Connecting to simulators');
    functions().useEmulator(config.apiUrl, 5001);
    database().useEmulator(config.apiUrl, 9000);
    auth().useEmulator(`${config.apiUrl}:9099`);
}

registerRootComponent(App);
