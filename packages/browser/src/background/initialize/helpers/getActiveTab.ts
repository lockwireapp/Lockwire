export const getActiveTab = async (): Promise<chrome.tabs.Tab> => {
    return new Promise((res) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            res(tabs[0]);
        });
    });
};
