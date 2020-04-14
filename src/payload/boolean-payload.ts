import * as Joi from '@hapi/joi';
import { BasePayload, InternalSchema } from './base-payload';
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

    public generateAttacks(): AttackPayload[] {
        return [];
    }

}
