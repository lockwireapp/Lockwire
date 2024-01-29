import React from 'react';
import { Crypto } from '@lckw/lib-crypto';
import { getRandomValues } from 'expo-crypto';
import { PaperProvider } from 'react-native-paper';
import { RootNavigation } from './components/RootNavigation';
import { I18nProvider } from './i18n';
import { AppConfig } from './AppConfig';
import { SnackbarProvider } from './components/Snackbar';
import { ConfirmDialog } from './components/RootNavigation/common/ConfirmDialog';
import { AuthProvider } from './auth/useAuth';

Crypto.setPRNG(getRandomValues);

const App: React.FC = () => {
    return (
        <PaperProvider>
            <I18nProvider>
                <AuthProvider>
                    <AppConfig>
                        <ConfirmDialog>
                            <SnackbarProvider>
                                <RootNavigation />
                            </SnackbarProvider>
                        </ConfirmDialog>
                    </AppConfig>
                </AuthProvider>
            </I18nProvider>
        </PaperProvider>
    );
};

export default App;
