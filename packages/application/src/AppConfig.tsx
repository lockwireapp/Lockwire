import Constants from 'expo-constants';
import React, { createContext } from 'react';

const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
if (!API_URL) {
    throw new Error('Please define API_URL env variable');
}

export const config = {
    apiUrl: API_URL,
    emulators: {
        auth: Constants.expoConfig?.extra?.FIREBASE_AUTH_EMULATOR_URL,
        functions: Constants.expoConfig?.extra?.FIREBASE_FUNCTIONS_EMULATOR_URL,
        rtdb: Constants.expoConfig?.extra?.FIREBASE_RTDB_EMULATOR_URL,
    },
};

export type IAppConfig = typeof config;

const AppConfigContext = createContext<IAppConfig>(config);

export const useAppConfig = () => config;

export const AppConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AppConfigContext.Provider value={config}>{children}</AppConfigContext.Provider>;
};
