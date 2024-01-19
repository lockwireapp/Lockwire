import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Auth, AuthNavigation } from './hooks/useAuthNavigation';
import { LoginScreen } from './components/LoginScreen';
import { NOOPComponent } from '../common/NOOPComponent';

export const AuthStack: React.FC = () => {
    return (
        <NavigationContainer>
            <Auth.Navigator>
                <Auth.Screen name={AuthNavigation.LOGIN} component={LoginScreen} options={{ header: NOOPComponent }} />
            </Auth.Navigator>
        </NavigationContainer>
    );
};
