export class PopupController {
    private popupPageUrl: string | undefined;

    constructor() {
        chrome.action.getPopup({}, (url) => {
            this.popupPageUrl = url;
        });
    }

    async isEnabled(): Promise<boolean> {
        return new Promise((res) => {
            chrome.action.getPopup({}, (url) => res(!!url));
        });
    }

    async open() {
        await chrome.action.openPopup();
    }

    async disable() {
        await chrome.action.setPopup({ popup: '' });
    }

    async enable() {
        if (!this.popupPageUrl) {
            throw new Error('');
        } else {
            await chrome.action.setPopup({ popup: this.popupPageUrl });
        }
    }
}
