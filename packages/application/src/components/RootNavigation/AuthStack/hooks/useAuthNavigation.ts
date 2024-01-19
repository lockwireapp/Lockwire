import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ILoginScreenProps } from '../components/LoginScreen';

export enum AuthNavigation {
    LOGIN = 'LOGIN',
}

type IAuthStackParamList = {
    [AuthNavigation.LOGIN]: ILoginScreenProps;
};

export const useAuthNavigation = () => {
    return useNavigation<StackNavigationProp<IAuthStackParamList, AuthNavigation>>();
};

export const Auth = createStackNavigator<IAuthStackParamList>();
