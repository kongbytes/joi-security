import * as Joi from '@hapi/joi';

import { BasePayload } from './base-payload';
import { StringPayload } from './string-payload';
import { NumberPayload } from './number-payload';
import { AltenativesPayload } from './alternatives-payload';
import { ArrayPayload } from './array-payload';
import { BooleanPayload } from './boolean-payload';
import { UnknownPayload } from './unknown-payload';
import { ObjectPayload } from './object-payload';
import { ValidPayload } from './valid-payload';

export function generatePayload(unknownSchema: unknown): BasePayload {

    if (!Joi.isSchema(unknownSchema)) {
        throw new Error('No schema given');
    }

    const schema = unknownSchema as Joi.Schema;

    if ((schema as any)['_valids']) {
        return new ValidPayload().buildFromSchema(schema);
    }

    if (schema.type === 'boolean') {
        return new BooleanPayload().buildFromSchema(schema);
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

    // TODO Looks like 'any'... WE DE NOT SUPPORT CURRENTLY:
    // - refs
    // - valid

    return new UnknownPayload();
}
