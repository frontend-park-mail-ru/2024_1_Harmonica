import {frontendURL} from '../../../shared/config.js';

export const parseMessageOnLink = (message) => {
    if (typeof message !== 'string') {
        return;
    }
    const result = {
        value: '',
        pin_id: undefined,
    };
    const reg_string = '(?:^|\\s)' + frontendURL + '\/pin\/\\d+(?:$|\\s)';
    const regex_g = new RegExp(reg_string, 'g');
    const regex_d = new RegExp(reg_string, '');
    if (message.search(regex_g) === -1) {
        result.value = message.trim();
        return result;
    }
    result.pin_id = parseInt(message.match(regex_g)[0].replace(/[^0-9]/g, ''), 10);
    result.value = message.replace(regex_d, ' ').trim();
    return result;
};
