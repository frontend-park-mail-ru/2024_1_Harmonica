import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

/** Like api class */
export class LikeAPI {
    /**
     * Constructs url.
     * @param {int} pinID - Id of pin.
     */
    constructor(pinID) {
        this.url = backendAPI + '/pins/' + pinID + '/like';
    }
    /**
     * Makes delete request.
     * @return {object} - code of request status and body.
     */
    async apiDELETE() {
        let response;
        try {
            const addOptions = {
                method: 'DELETE',
            };
            response = await fetch(this.url, {
                ...fetchRequest,
                ...addOptions,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            const body = await response.json();
            return {
                code: 51,
                errors: body.errors,
            };
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }
    /**
     * Makes post request.
     * @return {object} - code of request status and body.
     */
    async apiPOST() {
        let response;
        try {
            const addOptions = {
                method: 'POST',
            };
            response = await fetch(this.url, {
                ...fetchRequest,
                ...addOptions,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            const body = await response.json();
            return {
                code: 51,
                errors: body.errors,
            };
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }
}
