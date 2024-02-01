import { initFirebase } from '~src/background/initialize/helpers/initFirebase';
import { initMessaging } from './helpers/initMessaging';
import { initBrowserAction } from './helpers/initBrowserAction';

export const initialize = async () => {
    await initFirebase();
    await initMessaging();
    await initBrowserAction();
};
