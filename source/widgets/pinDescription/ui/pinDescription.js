import pinDescTemplate from './pinDescription.handlebars';
import './pinDescription.css';
import {View} from '../../../app/View.js';
import {PinInformationBlock} from '../../../features/pinInformationBlock/ui/pinInformationBlock.js';
import {PinControllerBlock} from '../../../features/pinControllerBlock/ai/pinControllerBlock.js';
import {PinFormBlock} from '../../../features/pinFormBlock/ui/pinFormBlock.js';
import {
    PinFormControllerBlock,
} from '../../../features/pinFormControllerBlock/ui/pinFormControllerBlock.js';

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
     * @function renderView
     * @param {json} pin – pin info
     */
    renderView(pin) {
        this.root.innerHTML = pinDescTemplate({pin});
        const topBlock = new PinInformationBlock();
        topBlock.render(pin);
        const bottomBlock = new PinControllerBlock();
        bottomBlock.render(pin);
    }

    /**
     * Function to render update content window
     * @function renderUpdate
     * @param {json} pin - pin information
     */
    renderUpdate(pin) {
        this.root.innerHTML = pinDescTemplate({pin});
        const topBlock = new PinFormBlock();
        topBlock.render(pin);
        const bottomBlock = new PinFormControllerBlock();
        bottomBlock.render();
    }
}
