import Joi from 'joi';
import * as _ from 'lodash-es';

import { generatePayload } from './payload/index.js';
import { ResultBag } from './result-bag.js';

/**
 * Scans a given Joi schema instance against malicious payloads
 * 
 * @param schema - A Joi schema instance
 * @param options - Scan options
 * @returns A result bag containing the scan results
 */
export function scanSchema(schema: Joi.Schema<unknown>, options: { ignoreTags: string[] }): ResultBag {

    const basePayload = generatePayload(schema);

    const validMock = basePayload.generateMock();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value, error } = schema.validate(validMock);

    if (error) {
        console.debug(value);
        console.debug(error);
        throw new Error('Expecting generated mock to pass the Joi validation schema but failed');
    }

    const generatedAttacks = basePayload.generateAttacks();
    const resultBag = new ResultBag();

    for (const attack of generatedAttacks) {

        if (mustIgnoreAttack(attack.tags, options.ignoreTags)) {
            continue;
        }

        const { error } = schema.validate(attack.payload);

        resultBag.addResult({
            result: error ? 'blocked' : 'bypassed',
            severity: attack.severity,
            messages: attack.messages,
            payload: attack.payload,
            tags: attack.tags || [],
            cwe: attack.cwe || [],
            description: attack.description || '',
            remediations: attack.remediations || []
        });
    }

    return resultBag;
}

function mustIgnoreAttack(attackTags: string[] | undefined, ignoreTags: string[]): boolean {
    return attackTags !== undefined && _.intersection(attackTags, ignoreTags).length > 0;
}
