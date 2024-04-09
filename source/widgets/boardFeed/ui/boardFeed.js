import {View} from '../../../app/View.js';
import boardFeedTemplate from './boardFeed.handlebars';
import './boardFeed.css';
import {Pins} from '../../../components/widget/pins/pins.js';
import {BoardFeedAPI} from '../api/api.js';
import {BoardView} from '../../../pages/boardView/ui/boardView.js';

export class BoardFeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#board-pins-feed');
    }

    render(board, pins){
        this.root.innerHTML = boardFeedTemplate({pins});

        if(pins){
            Pins(pins, 'board_feed', true);
        }

        for (let pin of pins){
            const pinDel = document.getElementById('board-pin-del-' + pin.pin_id.toString());
            pinDel.addEventListener('click', async (event) => {
                event.preventDefault();
                const deleteAPI = new BoardFeedAPI(board.board_id, pin.pin_id);
                await deleteAPI.api();

                const boardView = new BoardView();
                await boardView.render(board.board_id);
            });
        }
    }
}
