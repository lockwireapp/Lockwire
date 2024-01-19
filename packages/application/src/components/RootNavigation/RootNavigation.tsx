import React from 'react';
import { useAuthentication } from '../../auth/useAuthentication';
import { AuthStack } from './AuthStack';
import { UserStack } from './UserStack';

interface IRootNavigationProps {}

export const RootNavigation: React.FC<IRootNavigationProps> = () => {
    const { user } = useAuthentication();

    return user ? <UserStack /> : <AuthStack />;
};
