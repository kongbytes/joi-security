import Joi from 'joi';

import { AttackPayload } from '../attack';
import { SeverityLevel } from '../severity-level';

import { BasePayload, InternalSchema } from './base-payload';
import { generatePayload } from './utils';


export class ObjectPayload extends BasePayload {

    public entries: Map<string, BasePayload> = new Map<string, BasePayload>();

    public getKind(): string {
        return 'object';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): ObjectPayload {

        for (const keyEntry of rawSchema['$_terms'].keys) {
            this.addEntry(keyEntry.key, generatePayload(keyEntry.schema));
        }

        return this;
    }

    public addEntry(key: string, value: BasePayload): void {
        this.entries.set(key, value);
    }

    public generateMock(): { [keyName: string]: unknown } {

        const targetObject: { [keyName: string]: unknown } = {}

        for (const [keyName, value] of this.entries) {
            targetObject[keyName] = value.generateMock();
        }

        return targetObject;
    }

    public generateAttacks(): AttackPayload[] {

        const validObject = this.generateMock();

        const payloads = [];

        for (const [keyName, value] of this.entries) {

            const attacks = value.generateAttacks({ keyName });

            // TODO Attack ideas & discussions
            // - This is a JS validator, PHP payloads and other should be avoided
            // - Try to prepend/append data to regex due to lack of "$^"
            // - Detect malicious regex that can cause DDOS
            // - Include attacks in Base64 content
            // - Possibilities for injections in 'dataUri' (malicious SVG)
            // - Try to 'brute-force' strings (alphanum, emails, ...)
            // - Look for .git URL
            // - Try to detect Joi unsafe number use
            // - Key name agnostic usage
            //      * Key match path/file/upload: try path traversal, JS nullbyte files
            //      * Key match user/name: try to detect lack of trim() usage for 'admin '
            //      * Key match phone/mobile/line: paid numbers, ...

            for (const attack of attacks) {

                const attackPayload = { ...validObject };
                attackPayload[keyName] = attack.payload;
                payloads.push({
                    severity: attack.severity,
                    messages: attack.messages,
                    payload: attackPayload,
                    tags: attack.tags
                });
            }
        }

        payloads.push({
            severity: SeverityLevel.LOW,
            messages: ['Injecting unknown key with malicious values, may have side effects'],
            payload: {
                ...validObject,
                unknownKey: '<script></script>'
            }
        });

        return payloads;
    }

}
