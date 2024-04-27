import {API} from '../../../shared/api/API.js';

export class StatAPI extends API{
    constructor(...args) {
        const url = '/CSAT';
        super(url, ...args);
    }

    async statRequest(){
        return await super.GET();
    }
}
