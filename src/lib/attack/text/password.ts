import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const PASSWORD: AttackPayload[] = [
    {
        severity: SeverityLevel.INFO,
        messages: ['Weak password policy, vulnerable for brute-force'],
        payload: 'password',
        tags: ['password'],
        cwe: [521]
    }
];
