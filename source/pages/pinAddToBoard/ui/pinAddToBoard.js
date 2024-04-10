import {View} from '../../../app/View.js';
import errorWindowTemplate from './pinAddToBoard.handlebars';
import './pinAddToBoard.css'
import {BoardListView} from '../../../features/boardList/ui/boardList.js';
import {PinAddToBoardAPI} from '../api/api.js';
import {PinView} from '../../pinView/ui/pinView.js';

export class PinAddToBoardView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async render(pin){
        this.root.innerHTML = errorWindowTemplate({pin});
        const user = JSON.parse(localStorage.getItem('user'));
        const pinToBoardAPI = new PinAddToBoardAPI(user.nickname);
        const response = await pinToBoardAPI.api();

        const boardList = new BoardListView();
        boardList.render(response.body.boards, pin);

        const backButton = document.querySelector('#pin-to-board-back');
        backButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const pinView = new PinView();
            await pinView.renderPin(pin.pin_id);
        });
    }
}