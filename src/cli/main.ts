#!/usr/bin/env node

// TODO This is current work in progress
// - Install latest releases of Joi (14,15,16,17) and allow to pick one
// - Add support for HTML page generation with results and JS controls
// - Add support for extended outputs (plain, YAML, Burp, ZAP, ...)
// - Possible to create standalone version for browser usage?

import * as Joi from '@hapi/joi';
import * as chalk from 'chalk';
import { readFileSync } from 'fs';
import * as _ from 'lodash';
import * as yargs from 'yargs';

import { scanSchema } from '../lib';

import { ConsoleFormat, WebFormat } from './output';

function scanCode(filePath: string, options: { outputFormat: string; ignore: string[] }): void {

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

    const schema = eval(`const Joi = require('@hapi/joi');${fileContent}`) as Joi.Schema;
    const resultBag = scanSchema(schema, { 
        ignoreTags: options.ignore || []
    });

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
        command: 'scan <file> [--ignore=phone,markdown] [--output=console]',
        aliases: ['s'],
        builder: (yargs) => {
            return yargs
                .positional('file', {
                    describe: 'JS file containing a Joi schema',
                    type: 'string'
                })
                .option('ignore', {
                    describe: 'Ignore comma-separated attack tags',
                    default: '',
                    type: 'string'
                })
                .option('output', {
                    describe: 'Output format for attack results',
                    choices: ['console', 'web'],
                    default: 'console',
                    type: 'string'
                })
        },
        handler: (argv) => {

            try {
        
                scanCode(`${argv.file}`, {
                    outputFormat: _.isString(argv.output) ? argv.output : 'console',
                    ignore: _.isString(argv.ignore) && argv.ignore.length > 0 ? argv.ignore.split(',') : []
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function,no-empty-function
    .command('$0', 'xxx', () => {}, () => {

        console.log('');
        console.log('Scan your Joi validation schemas using this joi-security CLI.');
        console.log('Keep the Joi schema to analyze as last statement in your file,');
        console.log('as it will be otherwise ignored.');
        console.log('');

        console.log(chalk.bold('Scan a single Joi schema'));
        console.log(chalk.yellow('joi-security scan ./my-schema.js'));
        console.log('');

        console.log(chalk.bold('Ignore attacks'));
        console.log(chalk.yellow('joi-security scan ./my-schema.js --ignore=postgresql,aws'));
        console.log('');

        console.log(chalk.bold('Output to a web format'));
        console.log(chalk.yellow('joi-security scan ./my-schema.js --output=web'));
        console.log('');

    })
    .showHelpOnFail(true)
    .demandCommand()
    .argv
