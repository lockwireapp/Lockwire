import * as Haptics from 'expo-haptics';
import { ImpactFeedbackStyle } from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import { IUserStackScreenComponent, UserNavigation, useUserNavigation } from '../../hooks/useUserNavigation';
import { BarcodeScannerFrame } from './components/BarcodeScannerFrame';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { CameraPermissions } from './components/CameraPermissions';
import { useTranslations } from '../../../../../i18n';
import { useSnackbar } from '../../../../Snackbar';
import { useInitSession } from './useInitSession';
import { QRCodeData } from '@lckw/lib-models';
import { throttle } from './throttle';

const BARCODE_CAMERA_ASPECT_RATIO = 1.78;

const useFullscreenBarcodeStyles = () => {
    const screen = Dimensions.get('screen');
    const width = screen.width * BARCODE_CAMERA_ASPECT_RATIO;

    return {
        width,
        height: screen.height,
        marginLeft: (width - screen.width) / -2,
    };
};

export const LinkDeviceScreen: IUserStackScreenComponent<UserNavigation.LINK_DEVICE> = () => {
    const t = useTranslations();
    const snackbar = useSnackbar();
    const initSession = useInitSession();
    const navigation = useUserNavigation();
    const barcodeStyles = useFullscreenBarcodeStyles();
    const [scannedId, setScannedId] = useState<string>();
    const [isLoading, setLoading] = useState(false);

    const handleQrCodeScanned = useCallback(
        throttle(async (event: BarCodeEvent) => {
            try {
                const qrCode = QRCodeData.parse(event.data || '');
                if (qrCode.isValid() && scannedId !== qrCode.id) {
                    setLoading(true);
                    setScannedId(qrCode.id);
                    await Haptics.impactAsync(ImpactFeedbackStyle.Light);
                    await initSession(qrCode.id, qrCode.key);
                    setLoading(false);
                    navigation.navigate(UserNavigation.DEVICES_LIST, {});
                    snackbar.show({ text: t`Device has been linked` });
                }
            } catch (e) {
                setLoading(false);
                setScannedId(void 0);
                navigation.navigate(UserNavigation.DEVICES_LIST, {});
                snackbar.show({ text: `${t`Failed to link device`}. ${e}` });

                // TODO implement floating badge which displays only when incorrect qr code is visible
            }
        }, 500),
        [scannedId],
    );

    return (
        <CameraPermissions>
            <BarcodeScannerFrame>
                <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeScanned={isLoading ? void 0 : handleQrCodeScanned}
                    style={barcodeStyles}
                />
            </BarcodeScannerFrame>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size={'large'} animating />
                </View>
            )}
        </CameraPermissions>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
