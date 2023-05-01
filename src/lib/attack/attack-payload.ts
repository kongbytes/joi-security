import { SeverityLevel } from '../severity-level.js';

export interface AttackPayload {

    severity: SeverityLevel;
    messages: string[];
    payload: unknown;
    tags?: string[];

    description?: string;
    cwe?: number[];
    remediations?: string[];

}
