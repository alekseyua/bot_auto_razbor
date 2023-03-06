import { createStoreon } from 'storeon';

import { getPage } from './api-store/getpage';
import { helpers } from './helpers/index';

export const store = createStoreon([
    getPage,
    helpers,
])