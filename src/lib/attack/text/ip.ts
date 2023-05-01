import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const IP: AttackPayload[] = [
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['No IPv4 restriction on localhost may cause SSRF on local services'],
        payload: `127.0.0.1`,
        tags: ['ssrf','network'],
        cwe: [918]
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['No IPv4 restriction on private ranges may cause internal network SSRF'],
        payload: `10.10.124.110`,
        tags: ['ssrf','network'],
        cwe: [918]
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['No IPv4 restriction on private ranges may cause internal network SSRF'],
        payload: `192.168.1.56`,
        tags: ['ssrf','network'],
        cwe: [918]
    },
    {
        severity: SeverityLevel.INFO,
        messages: ['Network IPv4 reserved address may cause unknown actions'],
        payload: `0.0.0.0`,
        tags: ['network'],
        cwe: [941]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Network IPv4 reserved address may cause unknown actions'],
        payload: `255.255.255.255`,
        tags: ['network', 'broadcast'],
        cwe: [941]
    }
];
