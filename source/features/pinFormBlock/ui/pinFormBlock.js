import pinFormBlockTemplate from './pinFormBlock.handlebars';
import './pinFormBlock.scss';
import {View} from '../../../app/View.js';

/**
 * Handle pin update/create form
 */
export class PinFormBlock extends View {
    /**
     * Initialize values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-block-top');
    }

    /**
     * Form render function
     * @function render
     * @param {json} pin – pin information
     */
    render(pin) {
        this.root.innerHTML = pinFormBlockTemplate({pin});
    }
}
