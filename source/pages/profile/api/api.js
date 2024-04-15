import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class ProfileAPI {
    constructor(nickname) {
        this.url = backendAPI + '/users/' + nickname;
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
            const body = await response.json();
            return {
                code: body.code,
            };
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }
}
