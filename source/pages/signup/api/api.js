import {API} from '../../../shared/api/API.js';

export class SignupAPI extends API {
    constructor(...args) {
        const url = '/users';
        super(url, ...args);
    }

    async registerRequest(post) {
        return await super.POST(JSON.stringify(post));
    }
}
