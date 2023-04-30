import Joi from 'joi';

import { AttackPayload } from '../attack/index.js';

export abstract class BasePayload {

    public attackConstraints: AttackConstraint[] = [];

    public abstract getKind(): string;

    public abstract buildFromSchema(rawSchema: Joi.Schema & InternalSchema): BasePayload;

    public abstract generateMock(): unknown;

    public abstract generateAttacks(options?: AttackOptions): AttackPayload[];

    public addConstraint(item: AttackConstraint): void {
        this.attackConstraints.push(item);
    }

    public hasConstraint(name: unknown): boolean {
        return this.attackConstraints.find(constraint => constraint.name === name) !== undefined;
    }

    public getConstraint(name: unknown): { [detail: string]: unknown } {
        return this.attackConstraints.find(constraint => constraint.name === name)?.details || {};
    }

}

export interface InternalSchema {

    _rules?: {
        name: string;
        args: { [arg: string]: unknown };
    }[];

    _valids?: { _values: Set<unknown> };

    '$_terms'?: {
        items?: Joi.Schema[];
    };

}

export interface AttackConstraint {

    name: string;
    details?: { [detail: string]: unknown };

}

export interface AttackOptions {

    keyName?: string;

}
