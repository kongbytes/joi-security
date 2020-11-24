import { SeverityLevel } from '../severity-level';

export interface AttackPayload {

    severity: SeverityLevel;
    messages: string[];
    payload: unknown;
    tags?: string[];

}
