import { NOOP } from '@lckw/lib-utils';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface IConfirmDialogContext {
    open: (state: IConfirmDialogState) => void;
    close: () => void;
}

const ConfirmDialogContext = createContext<IConfirmDialogContext>({
    open: () => {
        throw new Error('Method is not implemented');
    },
    close: () => {
        throw new Error('Method is not implemented');
    },
});

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

interface IConfirmDialogStateInternal {
    open: boolean;
    title?: string;
    text: string;
    onConfirm?: () => Promise<void>;
}

type IConfirmDialogState = Omit<IConfirmDialogStateInternal, 'open'>;

const defaultState: IConfirmDialogStateInternal = {
    open: false,
    text: '',
};

const useConfirmDialogControls = ([state, setState]: [
    IConfirmDialogStateInternal,
    (state: IConfirmDialogStateInternal) => void,
]) => {
    const open = useCallback((newState: IConfirmDialogState) => setState({ ...newState, open: true }), [setState]);
    const close = useCallback(() => setState(defaultState), [setState]);
    return { ...state, visible: state.open, open, close };
};

export const ConfirmDialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(false);
    const state = useState<IConfirmDialogStateInternal>(defaultState);
    const { visible, open, close, onConfirm = NOOP, title, text } = useConfirmDialogControls(state);

    const handleClose = () => {
        if (!isLoading) {
            close();
        }
    };

    const contextValue = useMemo((): IConfirmDialogContext => {
        return {
            open,
            close,
        };
    }, [open, close]);

    return (
        <ConfirmDialogContext.Provider value={contextValue}>
            {children}
            <Portal>
                <Dialog visible={visible} onDismiss={handleClose}>
                    <Dialog.Title>{title || 'Confirm action'}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{text}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleClose} disabled={isLoading}>
                            No
                        </Button>
                        <Button
                            icon={'delete'}
                            mode={'contained'}
                            buttonColor={theme.colors.error}
                            disabled={isLoading}
                            loading={isLoading}
                            onPress={async () => {
                                setLoading(true);
                                await onConfirm();
                                setLoading(false);
                                handleClose();
                            }}
                        >
                            Yes
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ConfirmDialogContext.Provider>
    );
};
