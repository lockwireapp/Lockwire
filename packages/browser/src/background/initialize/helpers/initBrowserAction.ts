import { SessionManager, SessionManagerEvent } from '@lckw/lib-services';
import { PopupController } from '~src/background/PopupController';

const handleActionClick = (tab: chrome.tabs.Tab) => {
    console.log(tab);
    // TODO send target request
};

export const initBrowserAction = async () => {
    const popup = new PopupController();
    const hasSession = await SessionManager.isSet();
    const isPopupEnabled = await popup.isEnabled();

    // await SessionManager.endSession();

    if (hasSession && isPopupEnabled) {
        await popup.disable();
    }

    if (!chrome.action.onClicked.hasListener(handleActionClick)) {
        chrome.action.onClicked.addListener(handleActionClick);
    }

    SessionManager.addEventListener(async ({ type }) => {
        if (type === SessionManagerEvent.CREATE) {
            await popup.disable();
        } else if (type === SessionManagerEvent.END) {
            await popup.enable();
        }
    });
};
