import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// auth().signOut();

export function useAuthentication() {
    const [user, setUser] = React.useState<FirebaseAuthTypes.User>();

    React.useEffect(() => {
        return auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(void 0);
            }
        });
    }, []);

    return {
        user,
    };
}
