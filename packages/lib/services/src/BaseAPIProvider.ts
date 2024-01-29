import { BaseAuthService } from './BaseAuthService';

export abstract class BaseAPIProvider {
    // TODO Fix "any"
    protected abstract auth: BaseAuthService;

    abstract init: (data: any) => Promise<{ id: string; key: string }>;
    abstract connect: (data: any) => Promise<unknown>;
    abstract send: (data: any) => Promise<unknown>;
    abstract ack: (data: any) => Promise<unknown>;

    protected endpointFactory<TData, TResponse extends { error?: { message: string } }>(url: string) {
        return async (data: TData): Promise<Omit<TResponse, 'error'>> => {
            const idToken = await this.auth.getIdToken();
            if (!idToken) {
                throw new Error('Not signed in');
            }

            return fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken || ''}`,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(data),
            })
                .then(async (response) => {
                    if (response.status !== 200) {
                        if (response.status === 401) {
                            await this.auth.signOut();
                        }
                        throw new Error(String(response.status));
                    }

                    const contentType = response.headers.get('Content-Type') || '';
                    if (!contentType.includes('application/json')) {
                        throw new Error('Failed to parse response. Content type is not JSON');
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
