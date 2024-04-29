import likeTemplate from './like.handlebars';
import {View} from '../../../app/View.js';

/** Like window view */
export class Like extends View {
    /**
    * Default view constructor.
    * @constructor
    * @param {...any} args - args for constructor of view.
    */
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#pin-like');
    }
    /**
    * Renders view by checked status.
    * @param {bool} checked - Like exists ? true : false.
    */
    render(checked) {
        this.root.innerHTML = likeTemplate({checked});
    }
}
