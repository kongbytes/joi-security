import * as Joi from '@hapi/joi';

import { AttackPayload, NUMBER_ATTACKS } from '../attack';
import { BasePayload, InternalSchema } from './base-payload';

enum NumberConstraint {

    // Type constraints
    integer = 'integer',
    precision = 'precision',

    // Range constraints
    greater = 'greater',
    less = 'less',
    max = 'max',
    min = 'min',
    negative = 'negative',
    positive = 'positive',
    unsafe = 'unsafe',

    // Strict constraints
    multiple = 'multiple',
    port = 'port',
    sign = 'sign'

}

export class NumberPayload extends BasePayload {

    public getKind(): string {
        return 'number';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): NumberPayload {

        if (!rawSchema._rules) {
            return this;
        }

        const allowedConstraints: string[] = Object.values(NumberConstraint);
        for (const stringRule of rawSchema._rules) {

            if (!allowedConstraints.includes(stringRule.name)) {
                continue;
            }

            if (stringRule.name === NumberConstraint.min) {
                this.addConstraint({ name: NumberConstraint.min, details: { limit: stringRule.args.limit } })
            }
            else if (stringRule.name === NumberConstraint.max) {
                this.addConstraint({ name: NumberConstraint.max, details: { limit: stringRule.args.limit } })
            }
            else {
                this.addConstraint({ name: stringRule.name });
            }
        }

        return this;
    }

    public generateMock(): number {

        if (this.hasConstraint(NumberConstraint.max)) {
            return this.getConstraint(NumberConstraint.max).limit - 1;
        }

        if (this.hasConstraint(NumberConstraint.min)) {
            return this.getConstraint(NumberConstraint.min).limit + 1;
        }

        return 5;
    }

    public generateAttacks(): AttackPayload[] {

        return [
            ...NUMBER_ATTACKS.COMMON
        ];
    }

}
