import Constants from 'expo-constants';
import React, { createContext } from 'react';

const API_URL = process.env.EXPO_PUBLIC_SERVER_HOST;
const API_PROJECT_NAME = process.env.EXPO_PUBLIC_SERVER_PROJECT_NAME;
if (!API_URL || !API_PROJECT_NAME) {
    throw new Error('Please define API_URL and API_PROJECT_NAME env variables');
}

export const config = {
    apiUrl: API_URL,
    apiProjectName: API_PROJECT_NAME,
    emulators: {
        auth: Constants.expoConfig?.extra?.FIREBASE_AUTH_EMULATOR_URL,
        functions: Constants.expoConfig?.extra?.FIREBASE_FUNCTIONS_EMULATOR_URL,
        rtdb: Constants.expoConfig?.extra?.FIREBASE_RTDB_EMULATOR_URL,
    },
};

export type IAppConfig = typeof config;

const AppConfigContext = createContext<IAppConfig>(config);

export const AppConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AppConfigContext.Provider value={config}>{children}</AppConfigContext.Provider>;
};
