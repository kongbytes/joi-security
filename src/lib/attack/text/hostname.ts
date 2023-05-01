import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const HOSTNAME: AttackPayload[] = [
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['No local hostname restriction on may cause SSRF'],
        payload: `localhost`,
        tags: ['ssrf'],
        cwe: [918]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'lidǀ.com',
        tags: ['punycode', 'phishing'],
        cwe: [1007]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'starɓucks.com',
        tags: ['punycode', 'phishing'],
        cwe: [1007]
    }
];
