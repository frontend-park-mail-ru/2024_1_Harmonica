import {View} from '../../../app/View.js';
import PinFeedTemplate from './pin.handlebars';
import {PinView} from '../../../pages/pinView/ui/pinView.js';

export class PinFeedView extends View{
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    onClick(pinID) {
        window.location.pathname = '/pin/' + pinID;
    }

    render(pin) {
        this.root.innerHTML =  PinFeedTemplate({pin});
    }
}
