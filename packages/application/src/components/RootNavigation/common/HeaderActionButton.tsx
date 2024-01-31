import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

interface IFloatingHeaderProps {
    onNavigateBack?: () => void;
}

export const HeaderActionButton: React.FC<IFloatingHeaderProps> = ({ onNavigateBack }) => {
    if (onNavigateBack) {
        return <IconButton size={24} icon={'arrow-left'} iconColor={MD3Colors.secondary0} onPress={onNavigateBack} />;
    }
    return <IconButton size={24} icon={'menu'} iconColor={MD3Colors.secondary0} onPress={() => console.log('kek')} />;
};
