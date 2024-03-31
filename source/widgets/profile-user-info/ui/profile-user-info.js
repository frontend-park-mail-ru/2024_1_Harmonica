import userInfoTemplate from './profile-user-info.handlebars';

/**
 * Handle profile info widget
 */
class ProfileUserInfo {
    /**
     * Render profile info widget
     *
     * @param {json} user – user info to render
     */
    render(user) {
        const userInfo = document.getElementById('user-info');
        userInfo.innerHTML = userInfoTemplate({user});
    };
}

export default new ProfileUserInfo();
