import { BasePayload, InternalSchema } from './base-payload';
import * as Joi from '@hapi/joi';
import { generatePayload } from './utils';
import { AttackPayload } from '../attack';

export class AltenativesPayload extends BasePayload {

    private alternatives: BasePayload[] = [];

    public getKind() {
        return 'alternatives';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): AltenativesPayload {

        const alternativeSchemas = rawSchema['$_terms'].matches;
        this.alternatives = alternativeSchemas.map((schema: any) => generatePayload(schema.schema));

        return this;
    }

    public generateMock() {

        return this.alternatives[0].generateMock();
    }

    public generateAttacks(): AttackPayload[] {

        const attacks = this.alternatives.map(alternativePayload => alternativePayload.generateAttacks());
        return attacks.flat();
    }

}
