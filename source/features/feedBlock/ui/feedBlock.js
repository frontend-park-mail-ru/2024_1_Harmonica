import {View} from '../../../app/View.js';
import feedBlockTemplate from './feedBlock.handlebars';
import './feedBlock.scss';

/** Feed bloack window view */
export class FeedBlockView extends View {
    /**
    * Default view constructor.
    * @constructor
    * @param {Element} root - Element in which to paste.
    * @param {...any} args - args for constructor of view.
    */
    constructor(root, ...args) {
        super(...args);
        this.root = document.getElementById(root);
        this.eventListeners = [];
    }

    /**
    * Renders view by pin and boards.
    * @async
    * @param {object} objects - Feed items.
    * @param {object} RenderEntity - Entity to render.
    * @param {...any} args - args for constructor of view.
    */
    async render(objects, RenderEntity, ...args) {
        console.log(objects);
        this.root.innerHTML = feedBlockTemplate({objects});
        const prefix = '#feed-item-';
        for (let i = 0; i < objects.length; ++i) {
            const root = document.querySelector(prefix + i);
            const entity = new RenderEntity(root);
            entity.render(objects[i], ...args);
        }
    }
}
