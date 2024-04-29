import {View} from '../../../app/View.js';
import pinFeedTemplate from './pin.handlebars';
import './pin.scss';

/** Pin feed window view */
export class PinFeedView extends View {
    /**
    * Default view constructor.
    * @constructor
    * @param {Element} root - Element in which to paste.
    * @param {...any} args - args for constructor of view.
    */
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }
    /**
    * On click function.
    * @param {int} pinID - Id of pin to go.
    */
    onClick(pinID) {
        window.location.pathname = '/pin/' + pinID;
    }

    /**
    * Renders view by pin.
    * @param {object} pin - Pin entity.
    */
    render(pin) {
        this.root.innerHTML = pinFeedTemplate({pin});
        const eventRoot = document.querySelector('#pin-' + pin.pin_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(pin.pin_id);
        });
    }
}
