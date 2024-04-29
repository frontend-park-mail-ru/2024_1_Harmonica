import avatarTemplate from './avatar.handlebars';
import './avatar.scss';
import {View} from '../../../app/View.js';

/**
 * Class to render avatar
 */
export class Avatar extends View {
    /**
     * Constructor function to initialize start values
     * @constructor
     * @param {string} avatarID – ID of avatar
     * @param {Array} args – arguments to pass forward to View constructor
     */
    constructor(avatarID = 'avatar', ...args) {
        super(...args);
        this.root = document.querySelector(`#${avatarID}`);
    }

    /**
     * Function to render avatar object on the page
     * @function render
     * @param {string} avatarUrl – URL for avatar image
     */
    render(avatarUrl) {
        if (!avatarUrl) {
            avatarUrl = '/static/avatar.svg';
        }
        this.root.innerHTML = avatarTemplate({avatarUrl: avatarUrl});
    }
}
