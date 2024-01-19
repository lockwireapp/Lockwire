import { initFirebase } from '~src/background/initialize/helpers/initFirebase';
import { initMessaging } from './helpers/initMessaging';
import { initBrowserAction } from './helpers/initBrowserAction';

// TODO implement incognito session mode

export const initialize = async () => {
    initFirebase();
    await initMessaging();
    await initBrowserAction();
};
