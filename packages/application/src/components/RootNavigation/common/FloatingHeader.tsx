import React from 'react';
import { Text } from 'react-native-paper';
import { StatusBar, StyleSheet, View } from 'react-native';
import { HeaderActionButton } from './HeaderActionButton';

interface IFloatingHeaderProps {
    title: React.ReactNode;
    onNavigateBack?: () => void;
}

export const FloatingHeader: React.FC<IFloatingHeaderProps> = ({ title, onNavigateBack }) => {
    return (
        <View style={styles.wrap}>
            <HeaderActionButton onNavigateBack={onNavigateBack} />
            <Text variant={'titleLarge'} style={styles.title}>
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
    title: {
        color: '#000',
    },
});
