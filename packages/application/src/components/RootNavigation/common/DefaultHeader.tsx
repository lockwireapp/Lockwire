import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { HeaderActionButton, IHeaderActionButtonProps } from './HeaderActionButton';

interface IFloatingHeaderProps extends IHeaderActionButtonProps {
    title: React.ReactNode;
}

export const DefaultHeader: React.FC<IFloatingHeaderProps> = ({ title, ...props }) => {
    return (
        <View style={styles.wrap}>
            <HeaderActionButton {...props} />
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
