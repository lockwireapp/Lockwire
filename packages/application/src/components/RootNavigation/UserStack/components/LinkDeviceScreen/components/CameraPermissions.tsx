import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ActivityIndicator, Text } from 'react-native-paper';

const useBarcodeCameraPermissions = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync()
            .then(({ status }) => {
                setHasPermission(status === 'granted');
            })
            .catch(console.error);
    }, []);

    return hasPermission;
};

export const CameraPermissions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const hasPermission = useBarcodeCameraPermissions();

    if (!hasPermission) {
        return (
            <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {hasPermission === null ? (
                    <ActivityIndicator size={'large'} animating />
                ) : (
                    <Text variant={'titleLarge'}>No access to camera</Text>
                )}
            </View>
        );
    }

    return <>{children}</>;
};
