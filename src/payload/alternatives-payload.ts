import * as _ from 'lodash';
import * as Joi from '@hapi/joi';

import { BasePayload, InternalSchema } from './base-payload';
import { AttackPayload } from '../attack';
import { generatePayload } from './utils';

export class AltenativesPayload extends BasePayload {

    private alternatives: BasePayload[] = [];

    public getKind(): string {
        return 'alternatives';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): AltenativesPayload {

        const alternativeSchemas = rawSchema['$_terms'].matches;
        this.alternatives = alternativeSchemas.map((schema: any) => generatePayload(schema.schema));

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
