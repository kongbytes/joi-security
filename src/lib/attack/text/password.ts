import { SeverityLevel } from '../../severity-level';
import { AttackPayload } from '../attack-payload';

export const PASSWORD: AttackPayload[] = [
    {
        severity: SeverityLevel.INFO,
        messages: ['Passwords vulnerable for brute-force attacks'],
        payload: 'password',
        tags: ['password']
    }
];
