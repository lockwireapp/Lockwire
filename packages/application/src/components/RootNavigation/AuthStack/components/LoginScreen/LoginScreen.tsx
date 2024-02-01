import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { FormControl, VALIDATORS } from './FormControl';
import { useTemplateTranslation } from '../../../../../i18n';
import { useSnackbar } from '../../../../Snackbar';
import {
    INVALID_EMAIL_ERROR,
    INVALID_PASSWORD_ERROR,
    isAuthError,
    USER_DISABLED_ERROR,
    USER_NOT_FOUND_ERROR,
} from './LoginScreen.const';
import { useAuth } from '../../../../../auth/useAuth';

export interface ILoginScreenProps {}

const Input: React.FC<{ control: FormControl<string> } & TextInputProps> = ({ control, ...props }) => {
    return (
        <View>
            <TextInput
                {...props}
                value={control.value}
                onChangeText={(text) => control.setValue(text)}
                error={!control.isValid}
                mode={'outlined'}
                dense
            />
            <HelperText type={'error'} visible={!control.isValid}>
                {control.error?.message}
            </HelperText>
        </View>
    );
};

export const LoginScreen: React.FC<ILoginScreenProps> = () => {
    const auth = useAuth();
    const t = useTemplateTranslation();
    const snackbar = useSnackbar();
    const [isLoading, setLoading] = useState(false);
    const loginControl = new FormControl<string>({ validate: VALIDATORS.REQUIRED });
    const passwordControl = new FormControl<string>({ validate: VALIDATORS.REQUIRED });

    const handleSubmit = async () => {
        if (loginControl.error || passwordControl.error || !loginControl.value || !passwordControl.value || isLoading) {
            loginControl.setTouched(true);
            passwordControl.setTouched(true);
            return;
        }
        setLoading(true);

        try {
            await auth.signInWithEmailAndPassword(loginControl.value, passwordControl.value);
            setLoading(false);
        } catch (e) {
            if (isAuthError(e)) {
                switch (e.code) {
                    case INVALID_EMAIL_ERROR:
                    case USER_NOT_FOUND_ERROR:
                    case INVALID_PASSWORD_ERROR: {
                        snackbar.show({ text: t`Email or password are invalid`, mode: 'error' });
                        break;
                    }
                    case USER_DISABLED_ERROR: {
                        snackbar.show({ text: t`User is inactive`, mode: 'error' });
                        break;
                    }
                    default: {
                        snackbar.show({ text: t`Unhandled error`, mode: 'error' });
                    }
                }
            } else {
                console.error(e);
            }
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Input label={t`Email`} inputMode={'email'} control={loginControl} />
            <Input label={t`Password`} control={passwordControl} secureTextEntry />
            <Button mode={'contained'} onPress={handleSubmit} loading={isLoading}>
                {t`Login`}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: '20%',
    },
});
