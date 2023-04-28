import { AttackPayload } from '../attack-payload';

import { COMMON } from './common';
import { EMAIL } from './email';
import { HOSTNAME } from './hostname';
import { IP } from './ip';
import { PASSWORD } from './password';
import { PATH_TRAVERSAL } from './path-traversal';
import { PHONE } from './phone';
import { URI } from './uri';

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
