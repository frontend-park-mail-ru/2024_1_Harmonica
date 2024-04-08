import templateProfile from './profile.handlebars';
import './profile.css';
import {ProfileUserInfo} from '../../../widgets/profileUserInfo/ui/profileUserInfo.js';
import {ProfileFeed} from '../../../widgets/profileFeed/ui/profileFeed.js';
import {View} from '../../../app/View.js';

/**
 * Handle profile page
 */
export class Profile extends View {
    /**
     * Define some properties for profile page
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Render profile page
     * @function render
     * @param {Array} user – Contains info about user
     */
    render(user) {
        this.root.innerHTML = templateProfile();
        this.profileUserInfo = new ProfileUserInfo();
        this.profileFeed = new ProfileFeed();
        this.profileUserInfo.render(user);
        this.profileFeed.render([]);
    };
}
