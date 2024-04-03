import avatarTemplate from './avatar.handlebars';
import './avatar.css';
import {View} from '../../../app/View.js';

/**
 * Class to render avatar
 */
export class Avatar extends View {
    /**
     * Constructor function to initialize start values
     * @constructor
     * @param {Array} args – arguments to pass forward to View constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('avatar');
    }

    /**
     * Function to render avatar object on the page
     * @function render
     * @param {string} avatarUrl – URL for avatar image
     */
    render(avatarUrl) {
        this.root.innerHTML = avatarTemplate({avatarUrl: avatarUrl});
    }
}
