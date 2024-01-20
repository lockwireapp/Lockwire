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
    // TODO Fix "any"
    abstract init: (data: any, auth: IAuth) => Promise<{ id: string; key: string }>;
    abstract connect: (data: any, auth: IAuth) => Promise<unknown>;
    abstract send: (data: any, auth: IAuth) => Promise<unknown>;
    abstract ack: (data: any, auth: IAuth) => Promise<unknown>;

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
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            })
                .then(async (response) => {
                    if (response.status !== 200) {
                        if (response.status === 401) {
                            await auth.signOut();
                        }
                        throw new Error(String(response.status));
                    }

                    const contentType = response.headers.get('Content-Type') || '';
                    if (!contentType.includes('application/json')) {
                        throw new Error('Failed to parse response. Content type is not JSON')
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
