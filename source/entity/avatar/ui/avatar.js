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
     * @param {any} entity – entity where to search
     * @param {Array} args – arguments to pass forward to View constructor
     */
    constructor(avatarID = 'avatar', entity = document, ...args) {
        super(...args);
        this.root = entity.querySelector(`#${avatarID}`);
    }

    /**
     * Function to render avatar object on the page
     * @function render
     * @param {string} avatarUrl – URL for avatar image
     */
    render(avatarUrl) {
        console.log(avatarUrl);
        if (!avatarUrl) {
            avatarUrl = '/static/avatar.svg';
        }
        this.root.innerHTML = avatarTemplate({avatarUrl: avatarUrl});
    }
}
