export interface IAuth {
    currentUser:
        | {
              getIdToken: () => Promise<string>;
          }
        | undefined
        | null;
    signOut: () => Promise<void>;
}

export abstract class BaseAPIProvider {
    abstract init: (data: unknown, auth: IAuth) => Promise<{ id: string; key: string }>;
    abstract connect: (data: unknown, auth: IAuth) => Promise<unknown>;
    abstract send: (data: unknown, auth: IAuth) => Promise<unknown>;
    abstract ack: (data: unknown, auth: IAuth) => Promise<unknown>;

    protected endpointFactory<TData, TResponse extends { error?: { message: string } }>(url: string) {
        return async (data: TData, auth: IAuth): Promise<Omit<TResponse, 'error'>> => {
            const user = auth.currentUser;
            const idToken = await user?.getIdToken();
            if (!idToken) {
                try {
                    await auth.signOut();
                    throw new Error('No active user');
                } catch (e) {
                    throw new Error(`Failed to log out. ${e}`);
                }
            }

            return fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken || ''}`,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.status === 401) {
                        auth.signOut();
                    } else if (response.status !== 200) {
                        throw new Error(String(response.status));
                    }
                    return response.json();
                })
                .then((data: TResponse) => {
                    if (data.error) {
                        throw new Error(data.error.message || 'Unknown error');
                    }
                    return data;
                });
        };
    }
}
