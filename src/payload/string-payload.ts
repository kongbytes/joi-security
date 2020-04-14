import * as RandExp from 'randexp';
import * as Joi from '@hapi/joi';

import { BasePayload, InternalSchema } from './base-payload';
import { AttackPayload, STRING_ATTACKS } from '../attack';

export class StringPayload extends BasePayload {

    public getKind() {
        return 'string';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): StringPayload {
    
        if (!rawSchema._rules) {
            return this;
        }

        const allowedConstraints: string[] = Object.values(StringConstraint);
        for (const stringRule of rawSchema._rules) {

            if (!allowedConstraints.includes(stringRule.name)) {
                continue;
            }

            if (stringRule.name === StringConstraint.min) {
                this.addConstraint({ name: StringConstraint.min, details: { limit: stringRule.args.limit } })
            }
            else if (stringRule.name === StringConstraint.max) {
                this.addConstraint({ name: StringConstraint.max, details: { limit: stringRule.args.limit } })
            }
            else if (stringRule.name === StringConstraint.pattern || stringRule.name === 'regex') {
                this.addConstraint({ name: StringConstraint.pattern, details: { regex: stringRule.args.regex } })
            }
            else {
                this.addConstraint({ name: stringRule.name });
            }
        }

        return this;
    }

    public generateMock(): string {

        if (this.hasConstraint(StringConstraint.ip)) {
            return '37.56.180.29';
        }

        if (this.hasConstraint(StringConstraint.creditCard)) {
            return '5500 0000 0000 0004';
        }

        if (this.hasConstraint(StringConstraint.guid)) {
            return '75442486-0878-440c-9db1-a7006c25a39f';
        }

        if (this.hasConstraint(StringConstraint.domain)) {
            return 'example.domain.com';
        }

        if (this.hasConstraint(StringConstraint.email)) {
            return 'john.doe@company.com';
        }

        if (this.hasConstraint(StringConstraint.pattern)) {
            return new RandExp(this.getConstraint(StringConstraint.pattern).regex).gen();
        }

        if (this.hasConstraint(StringConstraint.uri)) {
            return 'https://domain.com';
        }

        if (this.hasConstraint(StringConstraint.alphanum)) {
            return 'alphanum';
        }

        // This string should pass the alphanum, token & hex format validation
        return 'Abc123';
    }

    public generateAttacks(): AttackPayload[] {

        if (this.hasConstraint(StringConstraint.email)) {
            return STRING_ATTACKS.EMAIL;
        }

        if (this.hasConstraint(StringConstraint.ip)) {
            return STRING_ATTACKS.IP;
        }

        if (this.hasConstraint(StringConstraint.hostname)) {
            return STRING_ATTACKS.HOSTNAME;
        }

        if (this.hasConstraint(StringConstraint.uri)) {
            return STRING_ATTACKS.URI;
        }

        return STRING_ATTACKS.COMMON;
    }

}

enum StringConstraint {

    // Case constraints
    case = 'case',

    // Length constraints
    length = 'length',
    min = 'min',
    max = 'max',

    // Pattern constraints
    base64 = 'base64',
    dataUri = 'dataUri',
    domain = 'domain',
    email = 'email',
    hostname = 'hostname',
    ip = 'ip',
    pattern = 'pattern',
    uri = 'uri',

    // Blacklisted constraints
    alphanum = 'alphanum',
    creditCard = 'creditCard',
    guid = 'guid',
    hex = 'hex',
    isoDate = 'isoDate',
    isoDuration = 'isoDuration',
    token = 'token'

}
