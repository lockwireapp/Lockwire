import { AuthEvent } from '@lckw/lib-services';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { AuthStack } from './AuthStack';
import { UserStack } from './UserStack';

interface IRootNavigationProps {}

let prev: any;

const useAuthState = () => {
    const auth = useAuth();
    const [signedIn, setSignedIn] = useState(auth.isAuthenticated());

    console.log(auth === prev);
    prev = auth;

    useEffect(() => {
        console.log('addEventListener');
        const index = auth.addEventListener((type) => {
            console.log(type);
            if (type === AuthEvent.SIGN_IN) {
                setSignedIn(true);
            } else if (type === AuthEvent.SIGN_OUT) {
                setSignedIn(false);
            }
        });

        return () => auth.removeEventListener(index);
    }, [auth, signedIn]);

    return signedIn;
};

export const RootNavigation: React.FC<IRootNavigationProps> = () => {
    const signedIn = useAuthState();

    return signedIn ? <UserStack /> : <AuthStack />;
};
