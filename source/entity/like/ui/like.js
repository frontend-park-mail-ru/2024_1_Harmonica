import likeTemplate from './like.handlebars';
import {View} from '../../../app/View.js';
import {LikeAPI} from '../api/api.js';

export class Like extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#pin-like');
    }
    render(checked) {
        this.root.innerHTML = likeTemplate({checked});
    }
}
