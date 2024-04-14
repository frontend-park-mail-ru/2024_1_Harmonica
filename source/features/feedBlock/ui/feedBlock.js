import {View} from '../../../app/View.js';
import FeedBlockTemplate from './feedBlock.handlebars';
import './feedBlock.css';

export class FeedBlockView extends View{
    constructor(root, ...args) {
        super(...args);
        this.root = document.getElementById(root);
        this.eventListeners = [];
    }

    async render(objects, renderEntity, IDName = 'pin_id', ...args){
        console.log(objects);
        this.root.innerHTML = FeedBlockTemplate({objects});
        const prefix = '#feed-item-';
        for (let i = 0; i < objects.length; ++i){
            const root = document.querySelector(prefix + i);
            const entity = new renderEntity(root);
            entity.render(objects[i], ...args);
        }
    }
}
