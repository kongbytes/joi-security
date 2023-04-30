import { AttackPayload } from '../attack-payload.js';

import { COMMON } from './common.js';
import { EMAIL } from './email.js';
import { HOSTNAME } from './hostname.js';
import { IP } from './ip.js';
import { PASSWORD } from './password.js';
import { PATH_TRAVERSAL } from './path-traversal.js';
import { PHONE } from './phone.js';
import { URI } from './uri.js';

export const STRING_ATTACKS: { [key: string]: AttackPayload[] } = {

    COMMON,
    PATH_TRAVERSAL,
    EMAIL,
    IP,
    HOSTNAME,
    URI,
    PHONE,
    PASSWORD,

};
