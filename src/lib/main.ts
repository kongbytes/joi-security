import Joi from 'joi';
import _ from 'lodash';

import { generatePayload } from './payload';
import { ResultBag } from './result-bag';

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

        if (attack.tags && _.intersection(attack.tags, options.ignoreTags).length > 0) {
            continue;
        }

        const { error } = schema.validate(attack.payload);

        resultBag.addResult({
            result: error ? 'blocked' : 'bypassed',
            severity: attack.severity,
            messages: attack.messages,
            payload: attack.payload,
            tags: attack.tags || []
        });
    }

    return resultBag;
}
