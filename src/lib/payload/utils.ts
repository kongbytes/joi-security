import Joi from 'joi';

import { AltenativesPayload } from './alternatives-payload.js';
import { ArrayPayload } from './array-payload.js';
import { BasePayload, InternalSchema } from './base-payload.js';
import { BooleanPayload } from './boolean-payload.js';
import { NumberPayload } from './number-payload.js';
import { ObjectPayload } from './object-payload.js';
import { StringPayload } from './string-payload.js';
import { UnknownPayload } from './unknown-payload.js';
import { ValidPayload } from './valid-payload.js';

export function generatePayload(unknownSchema: unknown): BasePayload {

    if (!Joi.isSchema(unknownSchema)) {
        throw new Error('No schema given');
    }

    const schema = unknownSchema as Joi.Schema;

    // eslint-disable-next-line no-extra-parens
    if ((schema as InternalSchema)['_valids']) {
        return new ValidPayload().buildFromSchema(schema);
    }

    if (schema.type === 'boolean') {
        return new BooleanPayload().buildFromSchema();
    }

    if (schema.type === 'string') {
        return new StringPayload().buildFromSchema(schema);
    }

    if (schema.type === 'alternatives') {
        return new AltenativesPayload().buildFromSchema(schema);
    }

    if (schema.type === 'number') {
        return new NumberPayload().buildFromSchema(schema);        
    }

    if (schema.type === 'array') {
        return new ArrayPayload().buildFromSchema(schema);
    }

    if (schema.type === 'object') {
        return new ObjectPayload().buildFromSchema(schema);
    }

    return new UnknownPayload();
}
