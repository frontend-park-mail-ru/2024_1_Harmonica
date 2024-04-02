import profileFeedTemplate from './profileFeed.handlebars';
import './profile-feed.css';
import {View} from '../../../app/View.js';

/**
 * Class for handle profile feed
 */
export class ProfileFeed extends View {
    /**
     * Define variables for profileFeed
     * @constructor
     * @param {Array} args – Variables to pass into parent constructor
     */
    constructor(...args) {
        super(...args);
        this.feed = document.getElementById('content');
    }

    /**
     * Render profile feed widget
     * @function render
     */
    render() {
        this.feed.innerHTML = profileFeedTemplate({empty: true});
    }
}
