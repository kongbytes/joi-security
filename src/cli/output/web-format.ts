import * as _ from 'lodash-es';

import { ResultBag, SeverityLevel } from '../../lib/index.js';

import { BaseFormat } from './base-format.js';

export class WebFormat extends BaseFormat {

    private readonly RAW_TEMPLATE = `
        <!DOCTYPE html>
        <html style="background: #ecf0f1;">
            <head>
                <title>Joi security | results</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" integrity="sha256-WLKGWSIJYerRN8tbNGtXWVYnUM5wMJTXD8eG4NtGcDM=" crossorigin="anonymous">
            </head>
            <body>
                <div class="container is-fluid">
                    <div class="mt-6 content">
                        <h2>Joi security results</h2>
                    </div>
                    <div class="columns">
                        <div class="column is-half">

                            <div class="card">
                                <div class="card-content content">
                                    <h4>Attack categories</h4>
                                    <% for (const [firstMessage, records] of results) { %>
                                        <span class="tag"><%- formatLevel(records[0].severity) %></span>
                                        <a href="#"><%- firstMessage %></a> (<%- records.length %> bypassed) <br>
                                    <% } %>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;

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

        return _.template(this.RAW_TEMPLATE)({
            results,
            allRecords: this.resultBag.records,
            formatLevel: this.formatLevel
        });
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
