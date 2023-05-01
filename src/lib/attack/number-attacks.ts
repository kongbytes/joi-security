import { SeverityLevel } from '../severity-level.js';

import { AttackPayload } from './attack-payload.js';

export const NUMBER_ATTACKS: { [key: string]: AttackPayload[] } = {

    COMMON: [
        {
            severity: SeverityLevel.LOW,
            messages: ['Negative overflow'],
            payload: Number.MIN_VALUE,
            tags: ['overflow']
        },
        {
            severity: SeverityLevel.INFO,
            messages: ['Numeric overflow'],
            payload: 10e200,
            tags: ['overflow']
        }
    ],

    YEAR: [
        {
            severity: SeverityLevel.INFO,
            messages: ['Unexpected behavior due to suspicious year'],
            payload: 42,
            tags: ['year']
        },
        {
            severity: SeverityLevel.INFO,
            messages: ['Unexpected behavior due to suspicious year'],
            payload: 7600,
            tags: ['year']
        }
    ]

};
