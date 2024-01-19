import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

interface IBackButtonProps {
    onNavigateBack: () => void;
}

export const BackButton: React.FC<IBackButtonProps> = ({ onNavigateBack }) => {
    return <IconButton size={24} icon={'arrow-left'} iconColor={MD3Colors.primary100} onPress={onNavigateBack} />;
};
