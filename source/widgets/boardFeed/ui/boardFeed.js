import {View} from '../../../app/View.js';
import boardFeedTemplate from './boardFeed.handlebars';
import './boardFeed.css';
import {Pins} from '../../../components/widget/pins/pins.js';
import {BoardFeedAPI} from '../api/api.js';
import {BoardView} from '../../../pages/board/ui/boardView.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinView} from '../../../pages/pin/ui/pinView.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';

export class BoardFeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#board-pins-feed');
    }

    render(board, pins){
        this.root.innerHTML = boardFeedTemplate({pins});

        if(pins) {
            // Pins(pins, 'board_feed', true);
            const feed = new FeedBlockView('board_feed');
            feed.render(pins, PinFeedView);

            // for (let pin of pins) {
            //     const pinDel = document.getElementById('board-pin-del-' + pin.pin_id.toString());
            //     pinDel.addEventListener('click', async (event) => {
            //         event.preventDefault();
            //         const deleteAPI = new BoardFeedAPI(board.board_id, pin.pin_id);
            //         await deleteAPI.api();
            //
            //         const boardView = new BoardView();
            //         await boardView.render(board.board_id);
            //     });
            // }
        }
    }
}
