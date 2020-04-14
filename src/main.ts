// TODO This is current work in progress
// - Install latest releases of Joi (14,15,16,17) and allow to pick one
// - Add support for HTML page generation with results and JS controls
// - Add support for extended outputs (plain, YAML, Burp, ZAP, ...)
// - Possible to create standalone version for browser usage?

import { readFileSync } from 'fs';
import * as meow from 'meow';

import { generatePayload } from './payload';
import { ConsoleFormat, ResultBag } from './output';

function scanCode(filePath: string, options: { outputFormat?: string, ignore?: string[], select?: string[] }) {

    console.log(options);

    const fileContent = readFileSync(filePath).toString()
    const schema = eval(`const Joi = require('@hapi/joi');${fileContent}`);

    const basePayload = generatePayload(schema);

    // ----

    const validMock = basePayload.generateMock();

    const { value, error } = schema.validate(validMock);

    if (error) {
        console.log(value);
        console.log(error);
        throw new Error('First initial payload should be valid');
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

    if (options?.outputFormat !== 'console') {
        throw new Error(`Output format not supported`);
    }

    const output = new ConsoleFormat(resultBag).process();
    console.log(output);
}

const cli = meow(`
    Usage
      $ joi-security scan <file.js>

    Commands
      scan    Scan JS file containing Joi schema
 
    Options
      --ignore, -i  Ignore comma-separated tags
      --select, -s  Select only comma-separated tags
      --output, -o  Output format
 
    Examples
      $ joi-security scan --output=json file.js
`, {
    version: '0.1.0',
    flags: {
        ignore: {
            type: 'string',
            alias: 'i'
        },
        select: {
            type: 'string',
            alias: 's'
        },
        output: {
            type: 'string',
            default: 'console',
            alias: 'o'
        }
    }
});

const [ mainCommand, filePath ] = cli.input;

if (mainCommand === 'scan') {

    // TODO Options not working
    scanCode(filePath, {
        outputFormat: cli.flags.output,
        select: cli.flags?.select?.split(','),
        ignore: cli.flags?.ignore?.split(',')
    });
    process.exit(0);
}

console.log(cli.help);
