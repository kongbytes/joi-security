import { BasePayload, InternalSchema, AttackOptions } from './base-payload';
import * as Joi from '@hapi/joi';
import { AttackPayload } from '../attack';

export class ValidPayload extends BasePayload {

    private validValues: unknown[] = [];

    public getKind() {
        return 'valid';
    }
    
    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema) {

        if (!rawSchema._valids) {
            return this;
        }

        this.validValues = Array.from(rawSchema._valids._values);
        return this;
    }

    public generateMock(): unknown {
        return this.validValues[0];
    }

    public generateAttacks(options?: AttackOptions): AttackPayload[] {
        return [];
    }

}
