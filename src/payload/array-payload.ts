import { BasePayload, InternalSchema } from './base-payload';
import * as Joi from '@hapi/joi';
import { AttackPayload } from '../attack';
import { generatePayload } from './utils';

export class ArrayPayload extends BasePayload {

    public allowedPayloads: BasePayload[] = [];

    public getKind() {
        return 'array';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): ArrayPayload {
        
        if (!rawSchema['$_terms']?.items) {
            return this;
        }

        this.allowedPayloads = rawSchema['$_terms']?.items.map(rawSchema => generatePayload(rawSchema));
        return this;
    }

    public generateMock() {
        return this.allowedPayloads.map(allowedPayload => allowedPayload.generateMock());
    }

    public generateAttacks(): AttackPayload[] {

        const allAttacks = this.allowedPayloads.map(allowedPayload => allowedPayload.generateAttacks()).flat();

        return allAttacks.map(attack => {

            return {
                ...attack,
                payload: [attack.payload]
            }

        });
    }
}
