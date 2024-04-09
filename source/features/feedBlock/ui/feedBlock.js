import {View} from '../../../app/View.js';
import {API} from '../../../shared/api/API.js';
import {Error} from '../../../components/pages/error/error.js';
import {Pins} from '../../../components/widget/pins/pins.js';

export class FeedBlockView extends View{
    constructor(root, ...args) {
        super(...args);
        this.root = document.getElementById(root);
    }

    render(root, objects){

        Pins(objects, root);
    }
}
