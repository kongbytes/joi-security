import * as Joi from '@hapi/joi';
import { BasePayload, InternalSchema, AttackOptions } from './base-payload';
import { AttackPayload } from '../attack';

export class BooleanPayload extends BasePayload {

    public getKind() {
        return 'boolean';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): BooleanPayload {
        return this;
    }

    public generateMock() {
        return true;
    }

    public generateAttacks(options?: AttackOptions): AttackPayload[] {
        return [];
    }

}
