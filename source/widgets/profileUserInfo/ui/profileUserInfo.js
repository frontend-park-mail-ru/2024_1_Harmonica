import userInfoTemplate from './profileUserInfo.handlebars';
import './profile-user-info.css';
import {Avatar} from '../../../features/avatar/ui/avatar.js';
import {View} from '../../../app/View.js';

/**
 * Handle profile info widget
 */
export class ProfileUserInfo extends View {
    /**
     * Constructor to initialize variables in user profile page
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.userInfo = document.getElementById('user-info');
    }
    /**
     * Render profile info widget
     * @function render
     * @param {json} user – user info to render
     */
    render(user) {
        this.userInfo.innerHTML = userInfoTemplate({user});
        const avatar = new Avatar();
        avatar.render(user.avatar_url);
    };
}
