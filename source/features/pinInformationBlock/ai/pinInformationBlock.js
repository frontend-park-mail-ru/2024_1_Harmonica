import pinInfoBlockTemplate from './pinInformationBlock.handlebars';
import './pinInformationBlock.css';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';

/**
 * Handle information in pins page
 */
export class PinInformationBlock extends View {
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
     * Render pins info block
     * @function render
     * @param {json} pin – pin info
     */
    render(pin) {
        this.root.innerHTML = pinInfoBlockTemplate({pin});
        const avatar = new Avatar();
        avatar.render(pin.author.avatar_url);
    }
}
