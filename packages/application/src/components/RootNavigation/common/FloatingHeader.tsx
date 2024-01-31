import React from 'react';
import { MD3Colors, Text } from 'react-native-paper';
import { StatusBar, StyleSheet, View } from 'react-native';
import { HeaderActionButton, IHeaderActionButtonProps } from './HeaderActionButton';

interface IFloatingHeaderProps extends IHeaderActionButtonProps {
    title: React.ReactNode;
}

export const FloatingHeader: React.FC<IFloatingHeaderProps> = ({ title, ...props }) => {
    return (
        <View style={styles.wrap}>
            <HeaderActionButton color={MD3Colors.primary100} {...props} />
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
        color: '#fff',
    },
});
