import * as Joi from '@hapi/joi';
import { AttackPayload } from '../attack';

export abstract class BasePayload {

    public attackConstraints: AttackConstraint[] = [];

    public abstract getKind(): string;

    public abstract buildFromSchema(rawSchema: Joi.Schema & InternalSchema): BasePayload;

    public abstract generateMock(): unknown;

    public abstract generateAttacks(options?: AttackOptions): AttackPayload[];

    public addConstraint(item: AttackConstraint) {
        this.attackConstraints.push(item);
    }

    public hasConstraint(name: unknown) {
        return this.attackConstraints.find(constraint => constraint.name === name);
    }

    public getConstraint(name: unknown): any {
        return this.attackConstraints.find(constraint => constraint.name === name)?.details;
    }

}

export interface InternalSchema {

    _rules?: { name: string, args: any }[];

    _valids?: { _values: Set<any> };

    '$_terms'?: {

        items?: Joi.Schema[]

    } 

}

export interface AttackConstraint {

    name: string;
    details?: any;

}

export interface AttackOptions {

    keyName?: string

}
