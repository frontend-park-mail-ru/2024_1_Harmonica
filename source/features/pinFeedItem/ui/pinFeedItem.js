import pinFeedTemplate from './pinFeedItem.handlebars';
import './pinFeedItem.css';
import {View} from '../../../app/View.js';

export class PinFeedItem extends View {
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-feed');
    }

    render(pinId) {
        this.root.innerHTML = pinFeedTemplate({pinId});
    }
}
