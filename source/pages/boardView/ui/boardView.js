import boardViewTemplate from './boardView.handlebars';
import './boardView.css';
import {View} from '../../../app/View.js';
import {BoardAPI} from '../api/api.js';
import {Profile} from '../../profile/ui/profile.js';
import {BoardEdit} from '../../boardEdit/ui/boardEdit.js';
import {BoardFeedView} from '../../../widgets/boardFeed/ui/boardFeed.js';

/**
 * Handle board page
 */
export class BoardView extends View {
    /**
     * Initialize values
     * @constructor
     * @param {json} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Render board page
     * @function render
     * @param {json} boardID – board's ID
     */
    async render(boardID) {
        const boardAPI = new BoardAPI(boardID);
        const response = await boardAPI.api();
        const board = response.body.board;
        console.log(board);
        this.root.innerHTML = boardViewTemplate({board});

        const boardFeed = new BoardFeedView();
        boardFeed.render(response.body.board, response.body.pins);

        if (board.is_owner) {
            const deleteButton = document.querySelector('#board-delete-button');
            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                boardAPI.apiDELETE();

                const profile = new Profile();
                const user = JSON.parse(localStorage.getItem('user'));
                profile.render(user.nickname);
            });

            const editButton = document.querySelector('#board-edit-button');
            editButton.addEventListener('click', (event) => {
                event.preventDefault();

                const editPage = new BoardEdit();
                editPage.renderUpdateBoard(board);
            });
        }
    }
}
