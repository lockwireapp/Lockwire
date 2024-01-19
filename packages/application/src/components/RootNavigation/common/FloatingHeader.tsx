import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BackButton } from './BackButton';

interface IFloatingHeaderProps {
    title: React.ReactNode;
    onNavigateBack: () => void;
}

export const FloatingHeader: React.FC<IFloatingHeaderProps> = ({ title, onNavigateBack }) => {
    return (
        <View style={styles.wrap}>
            <BackButton onNavigateBack={onNavigateBack} />
            <Text variant={'titleLarge'} style={{ color: '#fff' }}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        top: StatusBar.currentHeight,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        left: 0,
        right: 0,
        color: '#fff',
    },
});
