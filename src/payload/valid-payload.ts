import * as Joi from '@hapi/joi';

import { BasePayload, InternalSchema } from './base-payload';
import { AttackPayload } from '../attack';

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
