import pinControlBlockTemplate from './pinControllerBlock.handlebars';
import './pinControllerBlock.css';
import {View} from '../../../app/View.js';

/**
 * Class to render and handle edit and like buttons on pin
 */
export class PinControllerBlock extends View {
    /**
     * Initialize start values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-block-bottom');
    }

    /**
     * Function to render pins control buttons
     * @function render
     * @param {json} pin – pin information
     */
    render(pin) {
        this.root.innerHTML = pinControlBlockTemplate({pin});
    }
}
