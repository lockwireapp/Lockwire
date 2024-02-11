import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { IDeviceMetadata, IDeviceMetadataInternal } from '@lckw/lib-models';
import { createService } from '../../utils';

export interface IDeviceCredentials {
    id: string;

    /* hosting key of device */
    key: string;

    /* hosting key of server used for push message encryption */
    serverSign: string;

    /* private key used to data decryption */
    secretKey: string;
}

export interface IDevice extends IDeviceCredentials {
    meta: IDeviceMetadataInternal;
}

class DeviceStorageRecord implements IDevice {
    readonly id: string;
    readonly serverSign: string;
    readonly key: string;
    readonly secretKey: string;
    readonly meta: IDeviceMetadataInternal;

    constructor(props: IDevice) {
        this.id = props.id;
        this.serverSign = props.serverSign;
        this.key = props.key;
        this.secretKey = props.secretKey;
        this.meta = props.meta;
    }
}

type IState = Record<string, DeviceStorageRecord>;

const DEVICES_STORE_KEY = 'devices';

export enum DevicesStorageEvent {
    INIT = 'INIT',
    UPDATE = 'UPDATE',
}

// TODO persist devices in vault instead of expo-secure-store
class DevicesStorage {
    private state: IState = {};
    private eventListeners: ((event: DevicesStorageEvent) => void)[] = [];

    constructor() {
        this.initializeState();
    }

    list(): DeviceStorageRecord[] {
        return Object.values(this.state);
    }

    async set(value: IDevice) {
        this.state = { ...this.state, [value.id]: new DeviceStorageRecord(value) };
        await SecureStore.setItemAsync(DEVICES_STORE_KEY, JSON.stringify(this.state));
        this.emitEvent(DevicesStorageEvent.UPDATE);
    }

    has(id: string | undefined): boolean {
        const session = this.state[id!];
        return !!session;
    }

    get(id: string | undefined): DeviceStorageRecord | undefined {
        return this.state[id!];
    }

    remove(id: string) {
        const newSessions = { ...this.state };
        delete newSessions[id];
        this.state = newSessions;
        this.emitEvent(DevicesStorageEvent.UPDATE);
    }

    addEventListener(fn: () => void) {
        const index = this.eventListeners.length;
        this.eventListeners.push(fn);
        return index;
    }

    removeEventListener(index: number) {
        delete this.eventListeners[index];
    }

    private emitEvent(event: DevicesStorageEvent) {
        this.eventListeners.forEach((fn) => fn(event));
    }

    private initializeState() {
        SecureStore.getItemAsync(DEVICES_STORE_KEY).then((value) => {
            if (value) {
                this.state = JSON.parse(value);
            }
            this.emitEvent(DevicesStorageEvent.INIT);
        });
    }
}

export const useDevicesStorage = () => {
    const [, setState] = useState<DeviceStorageRecord[]>([]);
    const service = createService(DevicesStorage, () => new DevicesStorage())();

    useEffect(() => {
        const index = service.addEventListener(() => setState(service.list()));
        return () => service.removeEventListener(index);
    }, [service]);

    return service;
};
