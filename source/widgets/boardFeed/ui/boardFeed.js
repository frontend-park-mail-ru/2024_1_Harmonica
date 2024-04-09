import {View} from '../../../app/View.js';
import boardFeedTemplate from './boardFeed.handlebars';
import './boardFeed.css';
import {Pins} from '../../../components/widget/pins/pins.js';

export class BoardFeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#board-pins-feed');
    }

    render(pins){
        this.root.innerHTML = boardFeedTemplate({pins});

        if(pins){
            Pins(pins, 'board_feed');
        }
    }
}
