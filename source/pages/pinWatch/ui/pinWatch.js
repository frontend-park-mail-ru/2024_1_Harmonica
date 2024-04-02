import pinWatchTemplate from './pinWatch.handlebars';
import './pinWatch.css';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../features/avatar/ui/avatar.js';

/**
 * Handle pin page
 */
export class PinWatch extends View {
    /**
     * Initialize values
     * @param {Array} args – arguments to pass in parent class
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Function to render pin
     * @function render
     * @param {json} pin – info about pin
     */
    render(pin) {
        this.root.innerHTML = pinWatchTemplate({pin});
        const avatar = new Avatar();
        avatar.render(pin.author.avatar_url);
    }
}
