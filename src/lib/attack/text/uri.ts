import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const URI: AttackPayload[] = [
    {
        severity: SeverityLevel.HIGH,
        messages: ['Joi URI without scheme allows JavaScript inclusion'],
        payload: `javascript:alert('')`,
        cwe: [79]
    },
    {
        severity: SeverityLevel.HIGH,
        messages: ['Fetching UNIX file content on server'],
        payload: 'file:///etc/passwd',
        tags: ['path-traversal'],
        cwe: [35]
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['Port scan attempt using HTTP scheme with localhost'],
        payload: 'http://127.0.0.1:22',
        tags: ['ssrf'],
        cwe: [918]
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['Including SVG malicious image'],
        payload: 'http://brutelogic.com.br/poc.svg',
        cwe: [611]
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['SSRF attack on AWS bucket'],
        payload: 'http://instance-data/latest/meta-data/iam/security-credentials/',
        tags: ['ssrf','aws'],
        cwe: [918]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Reflected XSS in URL parameter'],
        payload: 'https://domain.com/search.html?query=<svg onload=alert(1)>&lang=en',
        tags: ['xss', 'reflected'],
        cwe: [79]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'https://spaɾ.com/login.html',
        tags: ['punycode', 'phishing'],
        cwe: [1007]
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'http://www.googĺe.com/register',
        tags: ['punycode', 'phishing'],
        cwe: [1007]
    }
];
