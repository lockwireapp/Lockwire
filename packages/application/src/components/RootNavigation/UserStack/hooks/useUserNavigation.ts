import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { INavigationRouteComponent } from '../../interfaces/INavigationRouteComponent';

export enum UserNavigation {
    DEVICES_LIST = 'DEVICES_LIST',
    DEVICE_LIST_ITEM = 'DEVICE_LIST_ITEM',
    LINK_DEVICE = 'LINK_DEVICE',
}

type IScreen<T extends object = {}> = T & INavigationRouteComponent<UserNavigation>;

export type IUserStackParamList = {
    [UserNavigation.DEVICES_LIST]: IScreen;
    [UserNavigation.DEVICE_LIST_ITEM]: IScreen<{ id?: string }>;
    [UserNavigation.LINK_DEVICE]: IScreen;
};

export type IUserStackRoute = RouteProp<IUserStackParamList, UserNavigation>;

export const useUserNavigation = () => {
    return useNavigation<StackNavigationProp<IUserStackParamList, UserNavigation>>();
};

export const User = createStackNavigator<IUserStackParamList>();

export type IUserStackScreenComponent<T extends UserNavigation> = React.FC<StackScreenProps<IUserStackParamList, T>>;
