import * as Joi from '@hapi/joi';
import { BasePayload, InternalSchema, AttackOptions } from './base-payload';
import { SeverityLevel } from '../severity-level';
import { AttackPayload, STRING_ATTACKS } from '../attack';

export class UnknownPayload extends BasePayload {

    public getKind() {
        return 'unknown';
    }
    
    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema) {
        return this;
    }

    public generateMock() {
        return 'Unknown';
    }

    public generateAttacks(options?: AttackOptions): AttackPayload[] {

        return [
            ...STRING_ATTACKS.COMMON,
            {
            severity: SeverityLevel.MEDIUM,
            messages: ['May cause NoSQL injection'],
            payload: {
                query: {
                    '$in': ['Admin', '4dm1n', 'admin', 'root', 'administrator']
                }
            }
        }];
    }
}
