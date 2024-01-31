import { useI18n } from '../../../../i18n';
import { IUserNavigationProp, IUserStackRoute, UserNavigation, userNavigationLabels } from './useUserNavigation';
import { FloatingHeader } from '../../common/FloatingHeader';
import { DefaultHeader } from '../../common/DefaultHeader';
import React from 'react';

export const useUserStackScreenOptions = () => {
    const i18n = useI18n();
    return (options: { floating?: boolean; fromRoute?: UserNavigation } = {}) =>
        (props: { route: IUserStackRoute; navigation: IUserNavigationProp }) => {
            const from = props.route.params?.from || options.fromRoute;
            const navigateBack = from && (() => props.navigation.navigate(from, {}));

            return {
                header: () => {
                    const Component = options.floating ? FloatingHeader : DefaultHeader;
                    const label = userNavigationLabels[props.route.name];
                    return (
                        <Component
                            title={i18n.translate(label, { defaultValue: label })}
                            onNavigateBack={navigateBack}
                            onDrawerOpen={() => props.navigation.openDrawer()}
                        />
                    );
                },
            };
        };
};
