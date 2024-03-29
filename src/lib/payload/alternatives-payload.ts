import Joi from 'joi';
import * as _ from 'lodash-es';

import { AttackPayload } from '../attack/index.js';

import { BasePayload, InternalSchema } from './base-payload.js';
import { generatePayload } from './utils.js';

export class AltenativesPayload extends BasePayload {

    private alternatives: BasePayload[] = [];

    public getKind(): string {
        return 'alternatives';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): AltenativesPayload {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
        this.alternatives = rawSchema['$_terms'].matches.map((schema: any) => generatePayload(schema.schema));

        return this;
    }

    public generateMock(): unknown {

        return this.alternatives[0].generateMock();
    }

    public generateAttacks(): AttackPayload[] {

        const attacks = this.alternatives.map(alternativePayload => alternativePayload.generateAttacks());
        return _.flatten(attacks);
    }

}
