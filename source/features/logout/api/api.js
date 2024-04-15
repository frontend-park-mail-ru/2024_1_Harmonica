import {API} from '../../../shared/api/API.js';

export class LogoutAPI extends API {
    constructor(...args) {
        const url = '/logout';
        super(url, ...args);
    }

    async logoutRequest() {
        return await super.GET();
    }
}
