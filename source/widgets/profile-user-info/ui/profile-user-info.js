import userInfoTemplate from './profile-user-info.handlebars';
import './profile-user-info.css';

/**
 * Handle profile info widget
 */
export class ProfileUserInfo {
    /**
     * Constructor to initialize variables in user profile page
     *
     * @function constructor
     */
    constructor() {
        this.userInfo = document.getElementById('user-info');
    }
    /**
     * Render profile info widget
     *
     * @param {json} user – user info to render
     */
    render(user) {
        this.userInfo.innerHTML = userInfoTemplate({user});
    };
}
