import boardViewTemplate from './boardView.handlebars';
import './boardView.scss';
import {View} from '../../../app/View.js';
import {BoardAPI} from '../api/api.js';
import {BoardEdit} from '../../boardEdit/ui/boardEdit.js';
import {BoardFeedView} from '../../../widgets/boardFeed/ui/boardFeed.js';
import {Error} from '../../error/ui/error.js';

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
        if (response.code !== 0) {
            const errorView = new Error();
            errorView.render();
            return;
        }
        const board = response.body.board;
        this.root.innerHTML = boardViewTemplate({board});

        const boardFeed = new BoardFeedView();
        boardFeed.render(response.body.board, response.body.pins);

        if (board.is_owner) {
            const deleteButton = document.querySelector('#board-delete-button');
            deleteButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const response = await boardAPI.apiDELETE();

                if (response.code) {
                    return;
                }

                const user = JSON.parse(localStorage.getItem('user'));
                history.pushState(null, null, `/profile/${user.nickname}`);
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
