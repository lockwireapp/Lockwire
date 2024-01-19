import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

interface IBarcodeScannerFrameProps {
    children?: React.ReactNode;
}

const useFrameDimensions = () => {
    const screen = Dimensions.get('screen');

    const areaWidth = screen.width * 0.8;
    const horizontalBarHeight = (screen.height - areaWidth) / 2;
    const verticalBarWidth = (screen.width - areaWidth) / 2;

    return {
        top: { height: horizontalBarHeight, left: 0, right: verticalBarWidth },
        right: { width: verticalBarWidth, top: 0, right: 0, bottom: 0 },
        bottom: { bottom: 0, height: horizontalBarHeight, right: verticalBarWidth },
        left: { left: 0, top: horizontalBarHeight, bottom: horizontalBarHeight, width: verticalBarWidth },
    } as const;
};

export const BarcodeScannerFrame: React.FC<IBarcodeScannerFrameProps> = ({ children }) => {
    const frame = useFrameDimensions();

    return (
        <View style={styles.container}>
            {children}
            <View style={{ ...styles.top, ...frame.top }} />
            <View style={{ ...styles.right, ...frame.right }} />
            <View style={{ ...styles.bottom, ...frame.bottom }} />
            <View style={{ ...styles.left, ...frame.left }} />
        </View>
    );
};

const frameStyles = StyleSheet.create({
    section: { position: 'absolute', backgroundColor: '#000', opacity: 0.3 },
});

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
    top: { ...frameStyles.section, top: 0, left: 0, right: 0 },
    right: { ...frameStyles.section, right: 0 },
    bottom: { ...frameStyles.section, bottom: 0, left: 0, right: 0 },
    left: { ...frameStyles.section, left: 0 },
});
