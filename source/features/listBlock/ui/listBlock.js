import {View} from '../../../app/View.js';
import listBlockTemplate from './listBlock.handlebars';
import './listBlock.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';

export class ListBlockView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = document.querySelector(`#${root}`);
    }

    render(objects, RenderEntity, ...args) {
        this.root.innerHTML = listBlockTemplate({objects});
        const prefix = '#list-item-';
        for (let i = 0; i < objects.length; ++i) {
            const root = document.querySelector(prefix + i);

            const entity = new RenderEntity(root);
            entity.render(objects[i], ...args);

            const avatar = new Avatar('list-item-avatar');
            avatar.render(objects[i].avatar_url);
        }
    }
}
