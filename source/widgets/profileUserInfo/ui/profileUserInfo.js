import userInfoTemplate from './profileUserInfo.handlebars';
import './profile-user-info.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
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
     * @param {json} userInfo – user info to render
     */
    render(userInfo) {
        this.userInfo.innerHTML = userInfoTemplate({userInfo});
        const avatar = new Avatar();
        avatar.render(userInfo.user.avatar_url);
    };
}
