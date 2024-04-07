import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class PinAPI{
    constructor(pinID) {
        this.url = backendAPI + "/pins/" + pinID.toString();
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
        if (!response.ok){
            return errCheck(response);
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        }
    }
}
