const registry = new Map<new () => object, object>();

export const createService = <T extends object>(Service: new () => T, getInstance: () => T) => {
    return (): T => {
        if (registry.has(Service)) {
            return registry.get(Service) as T;
        }
        const instance = getInstance();
        registry.set(Service, instance);
        return instance;
    };
};
