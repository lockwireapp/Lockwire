import React from 'react';
import { Crypto } from '@lckw/lib-crypto';
import { getRandomValues } from 'expo-crypto';
import { PaperProvider } from 'react-native-paper';
import { RootNavigation } from './components/RootNavigation';
import { I18nProvider } from './i18n';
import { AppConfig } from './AppConfig';
import { SnackbarProvider } from './components/Snackbar';
import { ConfirmDialog } from './components/RootNavigation/common/ConfirmDialog';

Crypto.setPRNG(getRandomValues);

const App = () => {
    return (
        <PaperProvider>
            <I18nProvider>
                <AppConfig>
                    <ConfirmDialog>
                        <SnackbarProvider>
                            <RootNavigation />
                        </SnackbarProvider>
                    </ConfirmDialog>
                </AppConfig>
            </I18nProvider>
        </PaperProvider>
    );
};

export default App;
