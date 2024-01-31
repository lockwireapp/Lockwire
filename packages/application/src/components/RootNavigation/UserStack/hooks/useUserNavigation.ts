import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { INavigationRouteComponent } from '../../interfaces/INavigationRouteComponent';
import { createDrawerNavigator, DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';

export enum UserNavigation {
    DEVICES_LIST = 'DEVICES_LIST',
    DEVICE_LIST_ITEM = 'DEVICE_LIST_ITEM',
    LINK_DEVICE = 'LINK_DEVICE',
}

export const userNavigationLabels: Record<UserNavigation, string> = {
    DEVICES_LIST: 'Devices',
    DEVICE_LIST_ITEM: 'View device',
    LINK_DEVICE: 'Link device',
};

export const userNavigationIcons: Record<UserNavigation, string> = {
    DEVICES_LIST: 'devices',
    DEVICE_LIST_ITEM: '',
    LINK_DEVICE: 'qrcode-plus',
};

type IScreen<T extends object = {}> = T & INavigationRouteComponent<UserNavigation>;

export type IUserStackParamList = {
    [UserNavigation.DEVICES_LIST]: IScreen;
    [UserNavigation.DEVICE_LIST_ITEM]: IScreen<{ id?: string }>;
    [UserNavigation.LINK_DEVICE]: IScreen;
};

export type IUserStackRoute = RouteProp<IUserStackParamList, UserNavigation>;
export type IUserNavigationProp = DrawerNavigationProp<IUserStackParamList, UserNavigation>;

export const useUserNavigation = () => useNavigation<IUserNavigationProp>();

export const User = createDrawerNavigator<IUserStackParamList>();

export type IUserStackScreenComponent<T extends UserNavigation> = React.FC<DrawerScreenProps<IUserStackParamList, T>>;
