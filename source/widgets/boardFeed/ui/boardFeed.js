import {View} from '../../../app/View.js';
import boardFeedTemplate from './boardFeed.handlebars';
import './boardFeed.css';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {BoardPinFeedView} from '../../../entity/boardPin/ui/boardPin.js';
import {API} from '../../../shared/api/API.js';

export class BoardFeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#board-pins-feed');
    }

    render(board, pins){
        this.root.innerHTML = boardFeedTemplate({pins});

        if(pins) {
            const feed = new FeedBlockView('board_feed');
            feed.render(pins, BoardPinFeedView, 'pin_id', board);
        }
    }
}
