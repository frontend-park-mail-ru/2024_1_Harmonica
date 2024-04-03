import pinDescTemplate from './pinDescription.handlebars';
import './pinDescription.css';
import {View} from '../../../app/View.js';
import {PinInformationBlock} from '../../../features/pinInformationBlock/ai/pinInformationBlock.js';
import {PinControllerBlock} from '../../../features/pinControllerBlock/ai/pinControllerBlock.js';

/**
 * Handle pin description block
 */
export class PinDescription extends View {
    /**
     * Initialize start values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-description');
    }

    /**
     * Render pin description widget
     * @function render
     * @param {json} pin – pin info
     */
    render(pin) {
        this.root.innerHTML = pinDescTemplate({pin});
        const topBlock = new PinInformationBlock();
        topBlock.render(pin);
        const bottomBlock = new PinControllerBlock();
        bottomBlock.render(pin);
    }
}
