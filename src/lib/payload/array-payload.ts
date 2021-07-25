import Joi from 'joi';
import _ from 'lodash';

import { AttackPayload } from '../attack';

import { BasePayload, InternalSchema } from './base-payload';
import { generatePayload } from './utils';

export class ArrayPayload extends BasePayload {

    public allowedPayloads: BasePayload[] = [];

    public getKind(): string {
        return 'array';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): ArrayPayload {
        
        if (!rawSchema['$_terms']?.items) {
            return this;
        }

        this.allowedPayloads = rawSchema['$_terms']?.items.map(rawSchema => generatePayload(rawSchema));
        return this;
    }

    public generateMock(): unknown[] {
        return this.allowedPayloads.map(allowedPayload => allowedPayload.generateMock());
    }

    public generateAttacks(): AttackPayload[] {

        const allAttacks = _.flatten(this.allowedPayloads.map(allowedPayload => allowedPayload.generateAttacks()));

        return allAttacks.map(attack => {

            return {
                ...attack,
                payload: [attack.payload]
            }

        });
    }
}
