import * as _ from 'lodash';

import { BaseFormat } from './base-format';
import { ResultBag } from './result-bag';
import { SeverityLevel } from '../severity-level';

export class WebFormat extends BaseFormat {

    constructor(
        private readonly resultBag: ResultBag
    ) {
        super();
    }

    public process(): string {

        const results = _.chain(this.resultBag.records)
            .filter(record => record.result === 'bypassed')
            .orderBy(['severity'])
            .groupBy(record => record.messages[0])
            .toPairs()
            .value();

        let output = '<!DOCTYPE><html><body>';
        for (const [firstMessage, records] of results) {

            output += `<b>${this.formatLevel(records[0].severity)} ${firstMessage}</b> (${records.length} payloads bypassed)}<br>`;
            output += `\r\n`;

            for (const record of records) {
                output += `<pre>${JSON.stringify(record.payload, null, '  ')}</pre>`;
            }

            output += `\r\n`;
        }

        return `${output}</body></html>`;
    }

    private formatLevel(level: SeverityLevel): string {

        if (level === SeverityLevel.CRITICAL) {
            return 'CRITICAL';
        }
        if (level === SeverityLevel.HIGH) {
            return 'HIGH';
        }
        if (level === SeverityLevel.MEDIUM) {
            return 'MEDIUM';
        }
        if (level === SeverityLevel.LOW) {
            return 'LOW';
        }
        if (level === SeverityLevel.INFO) {
            return 'INFO';
        }

        return '';
    }

}
