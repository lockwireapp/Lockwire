export enum SessionDevice {
    GOOGLE_CHROME = 'GOOGLE_CHROME',
    BRAVE = 'BRAVE',
    FIREFOX = 'FIREFOX',
    EDGE = 'EDGE',
    OPERA = 'OPERA',
    SAFARI = 'SAFARI',
    CHROMIUM = 'CHROMIUM',
    UNKNOWN = 'UNKNOWN',
}

const uaBrandSessionDeviceMap: Record<string, SessionDevice> = {
    Brave: SessionDevice.BRAVE,
};

type INavigatorWithUAData = Navigator & { userAgentData?: { brands: { brand: string }[] } };

export const getSessionDeviceType = (): { type: SessionDevice; name: string | undefined } => {
    const browser = navigator as INavigatorWithUAData;
    const brands = browser.userAgentData?.brands || [];
    const name = brands[0]?.brand;
    const isChromiumBased = brands.some(({ brand }) => brand.toLowerCase().includes('chromium'));
    const type = uaBrandSessionDeviceMap[name!] || (isChromiumBased ? SessionDevice.CHROMIUM : SessionDevice.UNKNOWN);
    return { type, name };
};
