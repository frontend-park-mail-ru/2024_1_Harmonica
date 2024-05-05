import boardListTemplate from './boardList.handlebars';
import './boardList.scss';
import {View} from '../../../app/View.js';
import {BoardView} from '../../../pages/board/ui/boardView.js';
import {BoardListAPI} from '../api/api.js';
import {errors} from '../../../shared/config.js';

/** Board list window view */
export class BoardListView extends View {
    /**
    * Default view constructor.
    * @constructor
    * @param {...any} args - args for constructor of view.
    */
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#boards-list');
    }

    /**
    * Renders view by pin and boards.
    * @param {object} boards - Boards entity.
    * @param {object} pin - Pin entity.
    */
    render(boards, pin) {
        if (boards) {
            this.root.innerHTML = boardListTemplate({boards});
            for (const board of boards) {
                const boardElem = document.querySelector('#board-' + board.board_id.toString());
                boardElem.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const pinAdd = new BoardListAPI(board.board_id, pin.pin_id);
                    const response = await pinAdd.api();

                    if (response.code) {
                        const errorField = document.querySelector('#add-to-board-error');
                        errorField.innerHTML = errors[response.code];
                        return;
                    }

                    const modal = document.querySelector('#dialog-window');
                    modal.close();

                    const boardView = new BoardView();
                    await boardView.render(board.board_id);
                });
            }
        }
    }
}
