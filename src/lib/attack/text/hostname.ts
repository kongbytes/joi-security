import { SeverityLevel } from '../../severity-level';
import { AttackPayload } from '../attack-payload';

export const HOSTNAME: AttackPayload[] = [
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['No local hostname restriction on may cause SSRF'],
        payload: `localhost`,
        tags: ['ssrf']
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'lidǀ.com',
        tags: ['punycode', 'phishing']
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'starɓucks.com',
        tags: ['punycode', 'phishing']
    }
];
