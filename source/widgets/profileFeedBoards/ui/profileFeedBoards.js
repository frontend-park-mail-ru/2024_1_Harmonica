import {View} from '../../../app/View.js';
import profileFeedBoardsTemplate from './profileFeedBoards.handlebars';
import './profileFeedBoards.css';

export class ProfileFeedBoardsView extends View{
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    onClick(boardID){
        window.location.pathname = '/board/' + boardID;
    }

    render(board){
        this.root.innerHTML = profileFeedBoardsTemplate({board});
        const eventRoot = document.querySelector('#board-' + board.board_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(board.board_id);
        });
    }
}
