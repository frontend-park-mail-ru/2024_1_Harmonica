import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class BoardAPI {
    constructor(boardID) {
        this.url = backendAPI + '/boards/' + boardID;
    }

    async api() {
        let response;
        try {
            response = await fetch(this.url, {
                ...fetchRequest,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            return errCheck(response);
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
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
}
