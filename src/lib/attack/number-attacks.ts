import { SeverityLevel } from '../severity-level';

import { AttackPayload } from './attack-payload';

export const NUMBER_ATTACKS: { [key: string]: AttackPayload[] } = {

    COMMON: [
        {
            severity: SeverityLevel.LOW,
            messages: ['Negative overflow'],
            payload: -999999999999,
            tags: ['overflow']
        },
        {
            severity: SeverityLevel.LOW,
            messages: ['Numeric overflow'],
            payload: 4294967295,
            tags: ['overflow']
        },
        {
            severity: SeverityLevel.LOW,
            messages: ['Numeric overflow'],
            payload: 54294967295,
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
