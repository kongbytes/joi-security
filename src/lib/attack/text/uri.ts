import { SeverityLevel } from '../../severity-level';
import { AttackPayload } from '../attack-payload';

export const URI: AttackPayload[] = [
    {
        severity: SeverityLevel.HIGH,
        messages: ['Joi URI without scheme allows JavaScript inclusion'],
        payload: `javascript:alert('')`
    },
    {
        severity: SeverityLevel.HIGH,
        messages: ['Fetching UNIX file content on server'],
        payload: 'file:///etc/passwd'
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['Port scan attempt using HTTP scheme with localhost'],
        payload: 'http://127.0.0.1:22',
        tags: ['ssrf']
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['Including SVG malicious image'],
        payload: 'http://brutelogic.com.br/poc.svg'
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['SSRF attack on AWS bucket'],
        payload: 'http://instance-data/latest/meta-data/iam/security-credentials/',
        tags: ['ssrf','aws']
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Reflected XSS in URL parameter'],
        payload: 'https://domain.com/search.html?query=<svg onload=alert(1)>&lang=en',
        tags: ['xss', 'reflected']
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'https://spaɾ.com/login.html',
        tags: ['punycode', 'phishing']
    },
    {
        severity: SeverityLevel.LOW,
        messages: ['Punycode domains may allow homograph phishing attacks'],
        payload: 'http://www.googĺe.com/register',
        tags: ['punycode', 'phishing']
    }
];
