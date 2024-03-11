/** @module source/components/pages/feed */

import {Pins} from '../../widget/pins/pins.js';
import {API} from '../../../modules/API.js';
import {Error} from '../error/error.js';

/**
 * Provides feed view on site by rendering 'Handlebars.templates.feed'.
 * @function Feed
 * @async
 */
export const Feed = async () => {
    const template = Handlebars.templates.feed;
    const root = document.getElementById('root');
    root.innerHTML = template({});

    const api = new API();
    const response = await api.feed();
    if (response.code !== 0) {
        Error();
        return;
    }
    Pins(response.pins);
};
