export interface Action<T = never> {
    readonly type: string;
    payload?: T;
}
