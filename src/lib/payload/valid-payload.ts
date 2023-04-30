import Joi from 'joi';

import { AttackPayload } from '../attack/index.js';

import { BasePayload, InternalSchema } from './base-payload.js';

export class ValidPayload extends BasePayload {

    private validValues: unknown[] = [];

    public getKind(): string {
        return 'valid';
    }
    
    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): ValidPayload {

        if (!rawSchema._valids) {
            return this;
        }

        this.validValues = Array.from(rawSchema._valids._values);
        return this;
    }

    public generateMock(): unknown {
        return this.validValues[0];
    }

    public generateAttacks(): AttackPayload[] {
        return [];
    }

}
