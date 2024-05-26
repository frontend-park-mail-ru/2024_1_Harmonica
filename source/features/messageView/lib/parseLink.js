import {frontendURL} from '../../../shared/config.js';

export const parseMessageOnLink = (message) => {
    if (typeof message !== 'string') {
        return;
    }
    const result = {
        value: '',
        pin_id: undefined,
    };
    const regString = '(?:^|\\s)' + frontendURL + '\/pin\/\\d+(?:$|\\s)';
    const regexG = new RegExp(regString, 'g');
    const regexD = new RegExp(regString, '');
    if (message.search(regexG) === -1) {
        result.value = message.trim();
        return result;
    }
    result.pin_id = parseInt(message.match(regexG)[0].replace(/[^0-9]/g, ''), 10);
    result.value = message.replace(regexD, ' ').trim();
    return result;
};
