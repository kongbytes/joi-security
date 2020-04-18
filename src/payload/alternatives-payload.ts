import * as Joi from '@hapi/joi';
import * as _ from 'lodash';

import { AttackPayload } from '../attack';

import { BasePayload, InternalSchema } from './base-payload';
import { generatePayload } from './utils';

export class AltenativesPayload extends BasePayload {

    private alternatives: BasePayload[] = [];

    public getKind(): string {
        return 'alternatives';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): AltenativesPayload {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
