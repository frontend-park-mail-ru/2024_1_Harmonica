import {frontendURL} from '../../../shared/config.js';

export const parseMessageOnLink = (message) => {
    if (typeof message !== 'string') {
        return;
    }
    const result = {
        value: '',
        pin_id: undefined,
    };
    const regex = new RegExp('(?:^|\\s)' + frontendURL + '\/pin\/\\d+(?:$|\\s)', 'g');
    if (message.search(regex) === -1) {
        result.value = message.trim();
        return result;
    }
    result.pin_id = parseInt(message.match(regex)[0].replace(/[^0-9]/g, ''), 10);
    result.value = message.replace(regex, ' ').trim();
    return result;
}
