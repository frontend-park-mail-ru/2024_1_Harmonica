import {View} from '../../../app/View.js';
import profileFeedBoardsTemplate from './profileFeedBoards.handlebars';
import './profileFeedBoards.scss';

/**
 * Class to handle view of board card
 */
export class FeedBoardsView extends View {
    /**
     * Initialize variables
     * @param {Element} root – element where to render
     * @param {Array} args – arguments to pass into parent function
     */
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    /**
     * Actions on click
     * @param {int} boardID – id of a board
     */
    onClick(boardID) {
        history.pushState(null, null, '/board/' + boardID);
    }

    /**
     * Function to render board card
     * @param {json} board – info about board
     */
    render(board) {
        this.root.innerHTML = profileFeedBoardsTemplate({board});
        const eventRoot = document.querySelector('#board-' + board.board_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(board.board_id);
        });
    }
}
