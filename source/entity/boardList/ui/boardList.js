import boardListTemplate from './boardList.handlebars';
import './boardList.scss';
import {View} from '../../../app/View.js';

/** Board list window view */
export class BoardListView extends View {
    /**
     * Default view constructor.
     * @constructor
     * @param elemID - element ID
     * @param {...any} args - args for constructor of view.
     */
    constructor(elemID, ...args) {
        super(...args);
        this.root = document.querySelector('#' + elemID);
    }

    /**
    * Renders view by pin and boards.
    * @param {object} boards - Boards entity.
    * @param {object} pin - Pin entity.
    */
    render(boards) {
        this.root.innerHTML = boardListTemplate({boards, boardsNotEmpty: boards?.length > 0});
    }
}
