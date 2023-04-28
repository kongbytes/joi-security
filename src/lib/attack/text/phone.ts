import { SeverityLevel } from '../../severity-level';
import { AttackPayload } from '../attack-payload';

export const PHONE: AttackPayload[] = [
    {
        severity: SeverityLevel.INFO,
        messages: ['Users may submit premium-rate phone numbers'],
        payload: '090522726',
        tags: ['phone', 'belgium', 'local']
    },
    {
        severity: SeverityLevel.INFO,
        messages: ['Users may submit premium-rate phone numbers'],
        payload: '+3290522726',
        tags: ['phone', 'belgium', 'international']
    },
    {
        severity: SeverityLevel.MEDIUM,
        messages: ['Unauthorized characters after phone number'],
        payload: '+3290522726<script></script>',
        tags: ['phone', 'international']
    }
];
