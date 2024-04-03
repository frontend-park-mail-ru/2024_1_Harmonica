import profileEditWindowTemplate from './profileEditWindow.handlebars';
import './profile-edit-window.css';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../features/avatar/ui/avatar.js';

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
    }
}
