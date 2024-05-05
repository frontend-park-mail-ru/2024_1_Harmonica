import {View} from '../../../app/View.js';
import pinAddToBoardTemplate from './pinAddToBoard.handlebars';
import './pinAddToBoard.scss';
import {BoardListView} from '../../../features/boardList/index.js';
import {PinAddToBoardAPI} from '../api/api.js';

export class PinAddToBoardView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#dialog-window');
    }

    async render(pin) {
        this.root.innerHTML = pinAddToBoardTemplate({pin});
        const user = JSON.parse(localStorage.getItem('user'));
        const pinToBoardAPI = new PinAddToBoardAPI(user.nickname);
        const response = await pinToBoardAPI.api();

        const boardList = new BoardListView();
        boardList.render(response.body.boards, pin);

        const backButton = document.querySelector('#pin-to-board-back');
        backButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const modal = document.querySelector('#dialog-window');
            modal.close();
        });
    }
}
