import { AttackPayload } from '../attack';
import { BasePayload } from './base-payload';

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
