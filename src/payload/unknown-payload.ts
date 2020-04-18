import { AttackPayload, STRING_ATTACKS } from '../attack';
import { SeverityLevel } from '../severity-level';

import { BasePayload } from './base-payload';

export class UnknownPayload extends BasePayload {

    public getKind(): string {
        return 'unknown';
    }
    
    public buildFromSchema(): UnknownPayload {
        return this;
    }

    public generateMock(): unknown {
        return 'Unknown';
    }

    public generateAttacks(): AttackPayload[] {

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
