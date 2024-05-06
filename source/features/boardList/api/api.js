import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

/** Like api class */
export class BoardListAPI {
    /**
     * Constructs url.
     * @param {int} boardID - Id of board.
     * @param {int} pinID - Id of pin.
     */
    constructor(boardID, pinID) {
        this.url = backendAPI + '/boards/' + boardID + '/pins/' + pinID;
    }

    /**
     * Makes post request to add pin to board.
     * @async
     * @return {object} - code of request status and body.
     */
    async api() {
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

