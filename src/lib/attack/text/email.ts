import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const EMAIL: AttackPayload[] = [
    {
        // This will work on older Joi versions, since RFC compliant
        severity: SeverityLevel.HIGH,
        messages: ['RFC-compliant email bypass'],
        payload: '"><svg/onload=confirm(1)>"@domain.com',
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'bookings@airfrạnce.com',
        tags: ['punycode', 'phishing']
    },
    {
        severity: SeverityLevel.INFO,
        messages: ['Allowing localhost domains may cause unknown actions'],
        payload: `admin@localhost`,
        tags: []
    }
];
