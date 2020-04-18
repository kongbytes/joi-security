import * as chalk from 'chalk';
import * as _ from 'lodash';

import { SeverityLevel } from '../severity-level';

import { BaseFormat } from './base-format';
import { ResultBag } from './result-bag';

export class ConsoleFormat extends BaseFormat {

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

        let output = '';
        for (const [firstMessage, records] of results) {

            output += `${this.formatLevel(records[0].severity)} ${chalk.whiteBright(firstMessage)} ${chalk.grey(`(${ records.length } payloads bypassed)`)}\r\n`;
            output += `\r\n`;

            for (const record of records) {
                output += `${chalk.yellow(JSON.stringify(record.payload, null, '  '))}\r\n`;
            }

            output += `\r\n`;
        }

        const analytics = _.countBy(this.resultBag.records, record => record.result);

        output += `Blocked attacks   ${analytics['blocked'] || 0}\r\n`;
        output += `Bypassed attacks  ${analytics['bypassed'] || 0}`;
        output += `\r\n`;

        return output;
    }

    private formatLevel(level: SeverityLevel): string {

        if (level === SeverityLevel.CRITICAL) {
            return chalk.bgRedBright('CRITICAL');
        }
        if (level === SeverityLevel.HIGH) {
            return chalk.bgRedBright('HIGH');
        }
        if (level === SeverityLevel.MEDIUM) {
            return chalk.bgGreen('MEDIUM');
        }
        if (level === SeverityLevel.LOW) {
            return chalk.bgGreen('LOW');
        }
        if (level === SeverityLevel.INFO) {
            return chalk.bgBlue('INFO');
        }

        return '';
    }

}
