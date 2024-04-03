import pinFromControllerTemplate from './pinFormControllerBlock.handlebars';
import './pinFormControllerBlock.css';
import {View} from '../../../app/View.js';

/**
 * Handle buttons in pins create/update
 */
export class PinFormControllerBlock extends View {
    /**
     * Initialize variables
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-block-bottom');
    }

    /**
     * Render control buttons
     * @function render
     */
    render() {
        this.root.innerHTML = pinFromControllerTemplate({});
    }
}
