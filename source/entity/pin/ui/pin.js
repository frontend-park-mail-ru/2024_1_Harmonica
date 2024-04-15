import {View} from '../../../app/View.js';
import PinFeedTemplate from './pin.handlebars';
import './pin.scss';

export class PinFeedView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    onClick(pinID) {
        window.location.pathname = '/pin/' + pinID;
    }

    render(pin) {
        this.root.innerHTML = PinFeedTemplate({pin});
        const eventRoot = document.querySelector('#pin-' + pin.pin_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(pin.pin_id);
        });
    }
}
