import {API} from '../../../shared/api/API.js';
/** Logout api class. */
export class LogoutAPI extends API {
    /**
     * Inits class.
     * @constructor
     * @param  {...any} args - args for API class constructor.
     */
    constructor(...args) {
        const url = '/logout';
        super(url, ...args);
    }
    /**
     * Make logout response.
     * @return {Promise<any>} - Request result promise.
     */
    async logoutRequest() {
        return await super.get();
    }
}
