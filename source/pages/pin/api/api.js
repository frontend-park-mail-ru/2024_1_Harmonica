import {backendAPI} from '../../../shared/config.js';
import {errCheck, fetchRequest} from '../../../shared/api/API.js';

export class PinAPI{
    constructor(pinID) {
        if (pinID === null){
            this.url = backendAPI + "/pins";
        } else {
            this.url = backendAPI + "/pins/" + pinID.toString();
        }
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

    async apiPOST(post) {
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

    async apiDELETE(){
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
