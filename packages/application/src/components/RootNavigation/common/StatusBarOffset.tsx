import React from 'react';
import { StatusBar, View } from 'react-native';

export const StatusBarOffset: React.FC = () => {
    return <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }} />;
};
