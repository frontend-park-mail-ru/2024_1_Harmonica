import boardEditTemplate from './boardEdit.handlebars';
import './boardEdit.css';
import {View} from '../../../app/View.js';

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
    }

    /**
     * Render create board page
     * @function renderCreateBoard
     */
    renderCreateBoard() {
        this.root.innerHTML = boardEditTemplate({});
    }
}
