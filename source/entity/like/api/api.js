import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class LikeAPI {
    constructor(pinID) {
        this.url = backendAPI + '/pins/' + pinID + '/like';
    }

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
