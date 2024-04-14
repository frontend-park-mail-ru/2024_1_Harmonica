import boardListTemplate from './boardList.handlebars';
import './boardList.scss';
import {View} from '../../../app/View.js';
import {BoardView} from '../../../pages/board/ui/boardView.js';
import {BoardListAPI} from '../api/api.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';

export class BoardListView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#boards-list');
    }

    render(boards, pin){
        if (boards) {
            this.root.innerHTML = boardListTemplate({boards});
            for (let board of boards) {
                const boardElem = document.querySelector('#board-' + board.board_id.toString());
                boardElem.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const pinAdd = new BoardListAPI(board.board_id, pin.pin_id);
                    const response = await pinAdd.api();

                    if(response.code){
                        const errorWindow = new ErrorWindowView();
                        errorWindow.render(errors[response.code]);
                        return;
                    }

                    const boardView = new BoardView();
                    await boardView.render(board.board_id);
                });
            }
        }
    }
}
