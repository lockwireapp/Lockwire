import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

export interface IHeaderActionButtonProps {
    color?: string;
    onNavigateBack?: () => void;
    onDrawerOpen: () => void;
}

export const HeaderActionButton: React.FC<IHeaderActionButtonProps> = ({ color, onNavigateBack, onDrawerOpen }) => {
    if (onNavigateBack) {
        return (
            <IconButton
                size={24}
                icon={'arrow-left'}
                iconColor={color || MD3Colors.secondary0}
                onPress={onNavigateBack}
            />
        );
    }
    return <IconButton size={24} icon={'menu'} iconColor={MD3Colors.secondary0} onPress={onDrawerOpen} />;
};
