import {View} from '../../../app/View.js';
import profileFeedBoardsTemplate from './profileFeedBoards.handlebars';
import './profileFeedBoards.css';
import {BoardView} from '../../../pages/boardView/ui/boardView.js';

export class ProfileFeedBoardsView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#profile_feed');
    }

    render(boards){
        this.root.innerHTML = profileFeedBoardsTemplate({boards});
        for (let board of boards){
            const boardElem = document.getElementById('board-' + board.board_id.toString());
            boardElem.addEventListener('click', async (event) =>{
                event.preventDefault();
                const boardView = new BoardView();
                await boardView.render(board.board_id);
            });
        }
    }
}
