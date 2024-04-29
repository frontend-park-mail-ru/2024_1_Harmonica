import {API} from '../../../shared/api/API.js';

export class LoginAPI extends API {
    constructor(...args) {
        const url = '/login';
        super(url, ...args);
    }
    async loginRequest(post) {
        return await super.post(JSON.stringify(post));
    }
}
