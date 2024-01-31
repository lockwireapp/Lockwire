import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { HeaderActionButton } from './HeaderActionButton';

interface IFloatingHeaderProps {
    title: React.ReactNode;
    onNavigateBack?: () => void;
}

export const DefaultHeader: React.FC<IFloatingHeaderProps> = ({ title, onNavigateBack }) => {
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        color: '#000',
    },
    title: {
        color: '#000',
    },
});
