import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class ProfileEditAPI {
    constructor(user_id) {
        this.url = backendAPI + '/users/' + user_id;
    }

    async api(post) {
        let response;
        try {
            const addOptions = {
                method: 'POST',
                body: post,
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
