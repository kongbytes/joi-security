import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const PASSWORD: AttackPayload[] = [
    {
        severity: SeverityLevel.INFO,
        messages: ['Passwords vulnerable for brute-force attacks'],
        payload: 'password',
        tags: ['password']
    }
];
