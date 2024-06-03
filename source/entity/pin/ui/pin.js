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
        history.pushState(null, null, '/pin/' + pinID);
    }

    /**
    * Renders view by pin.
    * @param {object} pin - Pin entity.
    */
    render(pin) {
        const renderPinFunc = () => {
            const width = window.innerWidth;
            let pinWidth = 250;
            if (width < 1024){
                if (width > 430){
                    pinWidth = 200;
                } else {
                    pinWidth = 150;
                }
            }
            if (this.currentWidth !== pinWidth){
                this.currentWidth = pinWidth;

                const ratio = pinWidth / pin.content_width;
                pin.content_width *= ratio;
                pin.content_height *= ratio;
                this.root.innerHTML = pinFeedTemplate({pin});
                const eventRoot = document.querySelector('#pin-' + pin.pin_id);
                eventRoot.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.onClick(pin.pin_id);
                });
            }
        }

        renderPinFunc();

        addEventListener('resize', renderPinFunc);
    }
}
