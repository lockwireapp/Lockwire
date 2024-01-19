import { database } from 'firebase-admin';
import * as log from 'firebase-functions/logger';
import { getDatabase } from 'firebase-admin/database';
import Reference = database.Reference;

const DB_REF = 'participants';

interface IParticipant {
    id: string;
    key: string;
    secretKey: string;
    pushToken: string;
    createdAt: string;
    active?: boolean;
    activatedAt?: string;
    counterpartyId?: string;
}

export class Participant implements IParticipant {
    readonly id: string;
    readonly key: string;
    readonly secretKey: string;
    readonly pushToken: string;
    readonly createdAt: string;
    readonly active: boolean;
    readonly activatedAt?: string;
    readonly counterpartyId?: string;

    private readonly dbRef: Reference;

    constructor(props: IParticipant) {
        this.id = props.id;
        this.key = props.key;
        this.secretKey = props.secretKey;
        this.pushToken = props.pushToken;
        this.createdAt = props.createdAt;
        this.active = props.active || false;
        this.activatedAt = props.activatedAt;

        if (!props.id) {
            throw new Error('Id is required');
        }

        this.dbRef = getDatabase().ref(DB_REF).child(props.id);
    }

    static async create({ key, pushToken, secretKey }: Omit<IParticipant, 'id' | 'createdAt'>): Promise<Participant> {
        const creationDateTime = new Date().toISOString();
        const ref = getDatabase().ref(DB_REF);
        const participant = await ref.push({ key, pushToken, createdAt: creationDateTime, secretKey });
        if (!participant.key) {
            throw new Error('Failed to create participant');
        }
        log.info(`Created new participant "${participant.key}"`);
        return new Participant({
            id: participant.key,
            key,
            secretKey,
            pushToken,
            createdAt: creationDateTime,
        });
    }

    static async get(id: string): Promise<Participant | null> {
        const participantRef = await getDatabase().ref(DB_REF).child(id).get();
        if (participantRef.exists()) {
            return new Participant({
                ...(participantRef.val() as IParticipant),
                id,
            });
        }
        return null;
    }

    async activate(counterpartyId: string): Promise<Participant> {
        const data: IParticipant = {
            ...this.toPlainObject(),
            activatedAt: new Date().toISOString(),
            counterpartyId,
            active: true,
        };
        await this.dbRef.set(data);
        log.info(`Activated participant "${this.id}"`);
        return new Participant(data);
    }

    async delete() {
        await this.dbRef.remove();
        log.info(`Removed participant "${this.id}"`);
    }

    private toPlainObject(): IParticipant {
        return {
            id: this.id,
            key: this.key,
            secretKey: this.secretKey,
            pushToken: this.pushToken,
            createdAt: this.createdAt,
            active: this.active,
            activatedAt: this.activatedAt,
            counterpartyId: this.counterpartyId,
        };
    }
}
