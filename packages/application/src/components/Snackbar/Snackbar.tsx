import { Icon, Snackbar, SnackbarProps, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NOOP } from '@lckw/lib-utils';

interface ISnackbarContext {
    show: (props: Partial<ISnackbarState>) => void;
}

interface ISnackbarState extends Omit<SnackbarProps, 'children' | 'visible'> {
    text: React.ReactNode;
    mode?: 'error'; // TODO implement
}

const SnackbarContext = createContext<ISnackbarContext>({
    show: () => {
        throw new Error('Method is not implemented');
    },
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<Partial<ISnackbarState>>();
    const { text, onDismiss = NOOP, ...snackbarProps } = state || {};

    const snackbarContextValue: ISnackbarContext = useMemo(
        () => ({
            show: setState,
        }),
        [setState],
    );

    return (
        <SnackbarContext.Provider value={snackbarContextValue}>
            {children}
            <SafeAreaView
                style={{
                    ...styles.container,
                    pointerEvents: state ? 'auto' : 'none',
                }}
            >
                <Snackbar
                    {...snackbarProps}
                    visible={!!state}
                    onDismiss={() => {
                        setState(void 0);
                        void onDismiss();
                    }}
                >
                    {text}
                </Snackbar>
            </SafeAreaView>
        </SnackbarContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
    },
});
