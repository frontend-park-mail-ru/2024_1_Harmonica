import {View} from '../../../app/View.js';
import FeedBlockTemplate from './feedBlock.handlebars';
import './feedBlock.css';
import {Pins} from '../../../components/widget/pins/pins.js';

export class FeedBlockView extends View{
    constructor(root, ...args) {
        super(...args);
        this.root = document.getElementById(root);
        this.eventListeners = [];
    }

    async render(objects, renderEntity){
        console.log(objects);
        this.root.innerHTML = FeedBlockTemplate({objects});
        const prefix = '#feed-item-';
        for (let i = 0; i < objects.length; ++i){
            const root = document.querySelector(prefix + i);
            const entity = new renderEntity(root);
            console.log(entity);
            entity.render(objects[i]);
            root.addEventListener('click', async (event) => {
                event.preventDefault();
                await entity.onClick(objects[i].pin_id);
            });
            this.eventListeners.push({root, entity});
        }
    }
}
