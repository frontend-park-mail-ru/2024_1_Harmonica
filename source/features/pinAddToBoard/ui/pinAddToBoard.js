import {View} from '../../../app/View.js';
import pinAddToBoardTemplate from './pinAddToBoard.handlebars';
import './pinAddToBoard.scss';
import {BoardListView} from '../../../entity/boardList/index.js';
import {PinAddToBoardAPI} from '../api/api.js';
import {errors} from '../../../shared/config.js';
import {BoardView} from '../../../pages/board/ui/boardView.js';
import {API} from '../../../shared/api/API.js';

export class PinAddToBoardView extends View {
    constructor(elemID, ...args) {
        super(...args);
        this.root = document.querySelector('#' + elemID);
    }

    async render(pin) {
        this.root.innerHTML = pinAddToBoardTemplate({pin});
        const user = JSON.parse(localStorage.getItem('user'));
        const pinToBoardAPI = new PinAddToBoardAPI(user.nickname);
        const response = await pinToBoardAPI.api();

        const boards = response.body.boards;

        const boardList = new BoardListView('boards-list');
        boardList.render(boards);

        if (boards) {
            for (const board of boards) {
                const boardElem = document.querySelector('#board-' + board.board_id.toString());
                boardElem.addEventListener('click', async (event) => {
                    event.preventDefault();

                    const api = new API('/boards/' + board.board_id + '/pins/' + pin.pin_id);
                    const response = await api.post({});

                    if (response.code) {
                        const errorField = document.querySelector('#add-to-board-error');
                        errorField.innerHTML = errors[response.code];
                        return;
                    }

                    const modal = document.querySelector('#dialog-window');
                    modal.close();

                    history.pushState(null, null, '/board/' + board.board_id)
                    // const boardView = new BoardView();
                    // await boardView.render(board.board_id);
                });
            }
        }

        const backButton = document.querySelector('#pin-to-board-back');
        backButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const modal = document.querySelector('#dialog-window');
            modal.close();
        });
    }
}
