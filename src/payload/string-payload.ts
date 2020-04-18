import * as _ from 'lodash';
import * as Joi from '@hapi/joi';
import * as RandExp from 'randexp';

import { AttackOptions, BasePayload, InternalSchema } from './base-payload';
import { AttackPayload, STRING_ATTACKS } from '../attack';

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

export class StringPayload extends BasePayload {

    public getKind(): string {
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
            else if (stringRule.name === StringConstraint.length) {
                this.addConstraint({ name: StringConstraint.length, details: { limit: stringRule.args.limit } })
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

        // From now, we should be dealing with 'loose validation' strings such
        // as alphanum, token or hex. We will thus focus on enforcing length and
        // case rules.

        let baseString = 'a';

        if (this.hasConstraint(StringConstraint.length)) {
            const expectedLength: number = this.getConstraint(StringConstraint.length).limit;
            baseString = _.repeat(baseString, expectedLength);
        }
        else if (this.hasConstraint(StringConstraint.min)) {
            const expectedMinLength: number = this.getConstraint(StringConstraint.min).limit;
            baseString = _.repeat(baseString, expectedMinLength);
        }

        // This string should pass the alphanum, token & hex format validation
        return baseString;
    }

    public generateAttacks(options?: AttackOptions): AttackPayload[] {

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

        let baseCollection = STRING_ATTACKS.COMMON;

        // If we are dealing with a potential file path input, we can add a new set
        // of dedicated path traversal attacks.
        if (options?.keyName?.match(/(path|file|doc|image|upload)/i)) {
            baseCollection = {
                ...STRING_ATTACKS.PATH_TRAVERSAL,
                ...baseCollection
            }
        }

        return baseCollection;
    }

}
