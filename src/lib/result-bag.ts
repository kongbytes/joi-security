import { SeverityLevel } from './severity-level.js';

/**
 * Stores and exposes all the results linked to a Joi schema scan
 */
export class ResultBag {

    private readonly recordsCollection: ResultRecord[] = [];

    public addResult(record: ResultRecord): void {
        this.recordsCollection.push(record);
    }

    public get records(): Readonly<ResultRecord[]> {
        return this.recordsCollection;
    }

}

/**
 * Attack results linked to a malicious payload sent on the Joi schema
 */
export interface ResultRecord {

    result: ResultCategory;
    severity: SeverityLevel;
    messages: string[];
    payload: unknown;
    tags: string[];

}

/**
 * A result state for a payload attack performed with Joi security
 * 
 * @remarks
 * The blocked state indicates that the Joi schema successfully blocked the
 * malicious payload. The bypassed state on the contrary indicates that the
 * attack bypassed all Joi validations - creating therefore a security issue.
 */
export type ResultCategory = 'blocked' | 'bypassed' | 'unknown';
