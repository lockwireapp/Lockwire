import { AuthEvent } from '@lckw/lib-services';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { AuthStack } from './AuthStack';
import { UserStack } from './UserStack';

interface IRootNavigationProps {}

const useAuthState = () => {
    const auth = useAuth();
    const [signedIn, setSignedIn] = useState(auth.isAuthenticated());

    useEffect(() => {
        auth.addEventListener((type) => {
            if (type === AuthEvent.SIGN_IN) {
                setSignedIn(true);
            } else if (type === AuthEvent.SIGN_OUT) {
                setSignedIn(false);
            }
        });
    }, [auth, signedIn]);

    return signedIn;
};

export const RootNavigation: React.FC<IRootNavigationProps> = () => {
    const signedIn = useAuthState();

    return signedIn ? <UserStack /> : <AuthStack />;
};
