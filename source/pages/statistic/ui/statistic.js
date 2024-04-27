import statTemplate from './statistic.handlebars';
import './statistic.scss';
import {StatAPI} from '../api/api.js';
import {View} from '../../../app/View.js';

export class Statistic extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    render() {
        const api = new StatAPI();
        // const stat = api.statRequest();
        const stat = [{
            question: 'Нравится ли вам Harmonium?',
            user: 'username',
            rating: 3,
        }, {
            question: 'Нравится ли вам Harmonium?',
            user: 'username2',
            rating: 5,
        }]
        this.root.innerHTML = statTemplate({stat});
    }
}
