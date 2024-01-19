import React from 'react';
import { IUserStackRoute, UserNavigation, useUserNavigation } from '../../../hooks/useUserNavigation';
import { FloatingHeader } from '../../../../common/FloatingHeader';
import { useTranslations } from '../../../../../../i18n';

interface ILinkDeviceScreenHeaderProps {
    route: IUserStackRoute;
}

export const LinkDeviceScreenHeader: React.FC<ILinkDeviceScreenHeaderProps> = ({ route }) => {
    const t = useTranslations();
    const navigation = useUserNavigation();

    return (
        <FloatingHeader
            title={t`Add device`}
            onNavigateBack={() => navigation.navigate(route.params?.from || UserNavigation.DEVICES_LIST, {})}
        />
    );
};
