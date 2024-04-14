import {View} from '../../../app/View.js';
import profileFeedBoardsTemplate from './profileFeedBoards.handlebars';
import './profileFeedBoards.css';
import {BoardView} from '../../../pages/board/ui/boardView.js';

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
    }
}
