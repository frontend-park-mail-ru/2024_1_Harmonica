import {View} from '../../../app/View.js';
import listBlockTemplate from './listBlock.handlebars';
import './listBlock.scss';

export class ListBlockView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = document.querySelector(`#${root}`);
        this.id = 0;
    }

    addRender(object, RenderEntity, ...args) {
        const elem = document.createElement('div');

        elem.innerHTML = listBlockTemplate({objects: [object]});

        const entity = new RenderEntity(elem);
        entity.render(object, ...args);
        this.id++;
    }
    render(objects, RenderEntity, ...args) {
        this.root.innerHTML = listBlockTemplate({objects});
        const prefix = '#list-item-';
        for (let i = 0; i < objects.length; ++i) {
            const root = document.querySelector(prefix + i);

            const entity = new RenderEntity(root);
            entity.render(objects[i], ...args);
        }
        this.id = objects.length;
    }
}
