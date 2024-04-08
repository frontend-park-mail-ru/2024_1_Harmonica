import boardViewTemplate from './boardView.handlebars';
import './boardView.css';
import {View} from '../../../app/View.js';

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
     * @param {json} board – board info
     */
    render(board) {
        this.root.innerHTML = boardViewTemplate({board});
    }
}
