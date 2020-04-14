import { SeverityLevel } from '../severity-level';

export class ResultBag {

    private readonly recordsCollection: ResultRecord[] = [];

    public addResult(record: ResultRecord) {
        this.recordsCollection.push(record);
    }

    public get records(): Readonly<ResultRecord[]> {
        return this.recordsCollection;
    }

}

export interface ResultRecord {

    result: ResultCategory;
    severity: SeverityLevel;
    messages: string[];
    payload: unknown;

}

export type ResultCategory = 'blocked' | 'bypassed' | 'unknown';
