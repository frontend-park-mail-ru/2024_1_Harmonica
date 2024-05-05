import boardEditTemplate from './boardEdit.handlebars';
import './boardEdit.scss';
import {View} from '../../../app/View.js';
import {BoardEditAPI} from '../api/api.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors, NORMAL_COLOR} from '../../../shared/config.js';
import {boardValidation} from '../../../shared/utils/validation.js';
import {Profile} from '../../profile/ui/profile.js';
import {BoardView} from '../../board/ui/boardView.js';

/**
 * Handle board create and update page
 */
export class BoardEdit extends View {
    /**
     * Initialize values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Render update board page
     * @function renderUpdateBoard
     * @param {json} board – board info
     */
    renderUpdateBoard(board) {
        this.root.innerHTML = boardEditTemplate({board});

        const backButton = document.querySelector('#board-back-button');
        backButton.addEventListener('click', (event) => {
            const boardView = new BoardView();
            boardView.render(board.board_id);
        });

        const boardAPI = new BoardEditAPI(board.board_id);
        const continueButton = document.querySelector('#board-save-button');

        continueButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.querySelector('#board-title');
            const description = document.querySelector('#board-description');


            if (boardValidation(title, description)) {
                description.style['border-color'] = NORMAL_COLOR;
                const formData = new FormData();
                const boardInfo = {
                    title: title.value,
                    description: description.value,
                };
                boardInfo.visibility_type = 'public';
                formData.append('board', JSON.stringify(boardInfo));

                const response = await boardAPI.api(formData);

                if (response.code) {
                    const errorWindow = new ErrorWindowView();
                    errorWindow.render(errors[response.code]);
                    return;
                }

                const newBoard = response.body.board;

                history.pushState(null, null, '/board/' + newBoard.board_id);
            }
        });
    }

    /**
     * Render create board page
     * @function renderCreateBoard
     */
    renderCreateBoard() {
        this.root.innerHTML = boardEditTemplate({});

        const backButton = document.querySelector('#board-back-button');
        backButton.addEventListener('click', (event) => {
            const user = JSON.parse(localStorage.getItem('user'));
            const profile = new Profile();
            profile.render(user.nickname);
        });

        const boardAPI = new BoardEditAPI(null);
        const continueButton = document.querySelector('#board-save-button');
        continueButton.addEventListener('click', async (event) => {
            const title = document.querySelector('#board-title');
            const description = document.querySelector('#board-description');

            if (boardValidation(title, description)) {
                const boardInfo = {
                    title: title.value,
                    description: description.value,
                };
                const response = await boardAPI.api(JSON.stringify(boardInfo));

                if (response.code) {
                    const errorWindow = new ErrorWindowView();
                    errorWindow.render(errors[response.code]);
                    return;
                }

                const board = response.body;

                history.pushState(null, null, '/board/' + board.board.board_id);
            }
        });
    }
}
