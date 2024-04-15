import {View} from '../../../app/View.js';
import FeedViewTemplate from './FeedView.handlebars';
import './FeedView.scss';
import {API} from '../../../shared/api/API.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';

export class FeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async render() {
        this.root.innerHTML = FeedViewTemplate({});
        const api = new API('/pins');
        const response = await api.GET();
        const pins = response.body.pins;
        console.log(response.body.pins);
        const feedBlock = new FeedBlockView('feed');
        feedBlock.render(pins, PinFeedView);
    }
}
