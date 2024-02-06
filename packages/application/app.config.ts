import { ExpoConfig, ConfigContext } from 'expo/config';

console.log(process.env.GOOGLE_SERVICES_JSON);

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'Lockwire',
    slug: 'lockwireapp',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        infoPlist: {
            NSCameraUsageDescription: 'Allow $(PRODUCT_NAME) to access camera.',
            NSMicrophoneUsageDescription: 'Allow $(PRODUCT_NAME) to access your microphone',
            NSFaceIDUsageDescription: 'Allow $(PRODUCT_NAME) to use Face ID.',
        },
        bundleIdentifier: 'com.lockwire.app',
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
        googleServicesFile: `${process.env.GOOGLE_SERVICES_JSON}.json`,
        permissions: [
            'android.permission.CAMERA',
            'android.permission.USE_BIOMETRIC',
            'android.permission.USE_FINGERPRINT',
        ],
        package: 'com.lockwire.app',
    },
    web: {
        favicon: './assets/favicon.png',
    },
    plugins: [
        '@react-native-firebase/app',
        '@react-native-firebase/perf',
        '@react-native-firebase/crashlytics',
        [
            'expo-barcode-scanner',
            {
                cameraPermission: 'Allow $(PRODUCT_NAME) to access camera.',
            },
        ],
        [
            'expo-local-authentication',
            {
                faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
            },
        ],
        'expo-localization',
    ],
    extra: {
        eas: {
            projectId: 'cfe1d340-aafe-4588-83e9-ce67a375185a',
        },
    },
    owner: 'lockwire',
});
