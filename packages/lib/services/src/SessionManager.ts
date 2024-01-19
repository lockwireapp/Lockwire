import { IsString, validateSync } from 'class-validator';

export interface ISession {
    id: string;
    key: string;
    secretKey: string;

    cpId: string;
    cpKey: string;
    serverSign: string;
}

class Session implements ISession {
    @IsString()
    id: string;

    @IsString()
    cpId: string;

    @IsString()
    cpKey: string;

    @IsString()
    serverSign: string;

    @IsString()
    key: string;

    @IsString()
    secretKey: string;
}

class SessionDTO extends Session {
    constructor(value: ISession) {
        super();
        this.id = value.id;
        this.cpId = value.cpId;
        this.cpKey = value.cpKey;
        this.serverSign = value.serverSign;
        this.key = value.key;
        this.secretKey = value.secretKey;
    }
}

const SESSION_KEY = 'session';

export enum SessionManagerEvent {
    CREATE = 'CREATE',
    END = 'END',
}

type IEventListener = (event: { type: SessionManagerEvent }) => Promise<void> | void;

export class SessionManager {
    private static listeners: IEventListener[] = [];

    static async getSession(): Promise<Session> {
        const value = (await chrome.storage.local.get(SESSION_KEY))[SESSION_KEY] as object;
        const session = new SessionDTO(value as ISession);
        const errors = validateSync(session);
        if (errors.length) {
            throw new Error(`Failed to get session. Errors: ${JSON.stringify(errors, null, 4)}`);
        }
        return session;
    }

    static async createSession(value: ISession): Promise<ISession> {
        await chrome.storage.local.set({ [SESSION_KEY]: value });
        await this.emitEvent(SessionManagerEvent.CREATE);
        return value;
    }

    static async endSession(): Promise<void> {
        await chrome.storage.local.set({ [SESSION_KEY]: null });
        await this.emitEvent(SessionManagerEvent.END);
        this.listeners = [];
    }

    static async isSet(): Promise<boolean> {
        try {
            const session = await this.getSession();
            return !!session;
        } catch (e) {
            return false;
        }
    }

    static addEventListener(fn: IEventListener) {
        this.listeners.push(fn);
    }

    static onSessionEnd(fn: () => void): void {
        this.addEventListener(({ type }) => {
            if (type === SessionManagerEvent.END) {
                fn();
            }
        });
    }

    private static async emitEvent(type: SessionManagerEvent) {
        try {
            await Promise.all(this.listeners.map((fn) => fn({ type })));
        } catch (e) {
            console.log(`Some of listeners failed on SessionStorage.${type} event.`, e);
        }
    }
}
