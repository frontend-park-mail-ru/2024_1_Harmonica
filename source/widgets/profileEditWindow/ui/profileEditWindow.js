import profileEditWindowTemplate from './profileEditWindow.handlebars';
import './profile-edit-window.css';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {Profile} from '../../../pages/profile/ui/profile.js';

/**
 * Class to handle profile edit window
 */
export class ProfileEditWindow extends View {
    /**
     * Initialize start values
     * @constructor
     * @param {Array} args – Arguments to pass in parent constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('window');
    }

    /**
     * Profile edit window render function
     * @function render
     * @param {json} user – user information
     */
    render(user) {
        this.root.innerHTML = profileEditWindowTemplate({user});
        const avatar = new Avatar();
        avatar.render(user.avatar_url);
        const buttonBack = document.querySelector('#profile-edit-back');
        buttonBack.addEventListener('click', async (event) => {
            event.preventDefault();
            const profile = new Profile();
            await profile.render(user.user.nickname);
        })
    }
}
