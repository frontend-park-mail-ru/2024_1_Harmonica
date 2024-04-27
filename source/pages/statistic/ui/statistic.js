import statTemplate from './statistic.handlebars';
import './statistic.scss';
import {StatAPI} from '../api/api.js';
import {View} from '../../../app/View.js';

export class Statistic extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async render() {
        const api = new StatAPI();
        const stat = await api.statRequest();
        const body = stat.body
        this.root.innerHTML = statTemplate({stat: body.Ratings});
    }
}
