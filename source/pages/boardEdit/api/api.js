import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

/** Board edit API class */
export class BoardEditAPI {
    /**
     * Inits api class.
     * @constructor
     * @param {int} boardID - board id.
     */
    constructor(boardID = null) {
        this.url = backendAPI + '/boards';
        if (boardID) {
            this.url += '/' + boardID;
        }
    }

    /**
     * Makes edit board request.
     * @async
     * @param {object} board - Edited board.
     * @return {object} - Request result.
     */
    async api(board) {
        let response;
        try {
            const addOptions = {
                method: 'POST',
                body: board,
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
