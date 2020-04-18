#!/usr/bin/env node

// TODO This is current work in progress
// - Install latest releases of Joi (14,15,16,17) and allow to pick one
// - Add support for HTML page generation with results and JS controls
// - Add support for extended outputs (plain, YAML, Burp, ZAP, ...)
// - Possible to create standalone version for browser usage?

import { readFileSync } from 'fs';
import * as _ from 'lodash';
import * as yargs from 'yargs';

import { ConsoleFormat, ResultBag, WebFormat } from './output';
import { generatePayload } from './payload';

function scanCode(filePath: string, options: { outputFormat: string; ignore?: string[]; select?: string[] }): void {

    if (!filePath) {
        throw new Error(`File containing the Joi validation schema must be provided`);
    }

    if (!['console','web'].includes(options.outputFormat)) {
        throw new Error(`Output format ${options.outputFormat} not supported`);
    }

    let fileContent = ''
    try {
        fileContent = readFileSync(filePath).toString();
    }
    catch (err) {
        throw new Error(`File containing the Joi validation schema not readable (${err.message})`);
    }

    const schema = eval(`const Joi = require('@hapi/joi');${fileContent}`);

    const basePayload = generatePayload(schema);

    // ----

    const validMock = basePayload.generateMock();

    const { value, error } = schema.validate(validMock);

    if (error) {
        console.log(value);
        console.log(error);
        throw new Error('Expecting generated mock to pass the Joi validation schema but failed');
    }

    // ------------

    const generatedAttacks = basePayload.generateAttacks();
    const resultBag = new ResultBag();

    for (const attack of generatedAttacks) {

        const { error } = schema.validate(attack.payload);

        resultBag.addResult({
            result: (error) ? 'blocked' : 'bypassed',
            severity: attack.severity,
            messages: attack.messages,
            payload: attack.payload
        });
    }

    if (options.outputFormat === 'console') {
        const output = new ConsoleFormat(resultBag).process();
        console.log(output);
    }
    else if (options.outputFormat === 'web') {
        const output = new WebFormat(resultBag).process();
        console.log(output);
    }
}

yargs
    .command({
        command: 'scan <file>',
        aliases: ['s'],
        builder: (yargs) => yargs.default('value', 'true'),
        handler: (argv) => {

            try {

                scanCode(`${argv.file}`, {
                    outputFormat: (_.isString(argv.output)) ? argv.output : 'console',
                });
                process.exit(0);
        
            }
            catch (err) {
        
                console.log();
                console.log(err.message);
                console.log();
                process.exit(1);
            }

        }
    })
    .showHelpOnFail(true)
    .help()
    .demandCommand()
    .argv
