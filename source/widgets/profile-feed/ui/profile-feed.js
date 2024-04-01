import profileFeedTemplate from './profile-feed.handlebars';
import './profile-feed.css';

/**
 * Class for profile feed
 * @class
 * @classdesc This class render and handle feed in profile
 */
export class ProfileFeed {
    /**
     * Define variables for profileFeed
     *
     * @function constructor
     */
    constructor() {
        this.feed = document.getElementById('content');
    }

    /**
     * Render profile feed widget
     *
     * @function render
     */
    render() {
        this.feed.innerHTML = profileFeedTemplate({empty: true});
    }
}
