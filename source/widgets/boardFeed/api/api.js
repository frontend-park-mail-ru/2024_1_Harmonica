import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class BoardFeedAPI {
    constructor(boardID, pinID) {
        this.url = backendAPI + '/boards/' + boardID + '/pins/' + pinID;
    }

    async api() {
        let response;
        try {
            const addOptions = {
                method: 'DELETE',
            };
            response = await fetch(this.url, {
                ...fetchRequest,
                ...addOptions,
            });
        } catch (error){
            return errCheck(error);
        }
        if (!response.ok){
            const body = await response.json();
            return {
                code: body.code,
            };
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        }
    }
}
