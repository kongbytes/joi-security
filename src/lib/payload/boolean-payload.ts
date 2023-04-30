import { AttackPayload } from '../attack/index.js';

import { BasePayload } from './base-payload.js';

export class BooleanPayload extends BasePayload {

    public getKind(): string {
        return 'boolean';
    }

    public buildFromSchema(): BooleanPayload {
        return this;
    }

    public generateMock(): boolean {
        return true;
    }

    public generateAttacks(): AttackPayload[] {
        return [];
    }

}
