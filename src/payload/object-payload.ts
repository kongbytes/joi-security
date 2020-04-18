import * as Joi from '@hapi/joi';

import { BasePayload, InternalSchema } from './base-payload';
import { AltenativesPayload } from './alternatives-payload';
import { ArrayPayload } from './array-payload';
import { AttackPayload } from '../attack';
import { BooleanPayload } from './boolean-payload';
import { generatePayload } from './utils';
import { NumberPayload } from './number-payload';
import { SeverityLevel } from '../severity-level';
import { StringPayload } from './string-payload';
import { UnknownPayload } from './unknown-payload';

export class ObjectPayload extends BasePayload {

    public entries: Map<string, ObjectPayload | StringPayload | NumberPayload | AltenativesPayload | ArrayPayload | BooleanPayload | UnknownPayload> = new Map();

    public getKind(): string {
        return 'object';
    }

    public buildFromSchema(rawSchema: Joi.Schema & InternalSchema): ObjectPayload {

        for (const keyEntry of rawSchema['$_terms'].keys) {
            this.addEntry(keyEntry.key, generatePayload(keyEntry.schema));
        }

        return this;
    }

    public addEntry(key: string, value: any): void {
        this.entries.set(key, value);
    }

    public generateMock(): any {

        const targetObject: any = {}

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
            // - Danger IP ranges (localhost, broadcast, private ranges, CIDR, ...)
            // - Try to prepend/append data to regex due to lack of "$^"
            // - Detect malicious regex that can cause DDOS
            // - Include attacks in Base64 content
            // - Possibilities for injections in 'dataUri' (malicious SVG)
            // - IDN homograph attacks on email & domains
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
