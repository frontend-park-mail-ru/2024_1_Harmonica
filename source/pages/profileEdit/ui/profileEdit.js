import {View} from '../../../app/View.js';
import profileEditTemplate from './profileEdit.handlebars';
import {ProfileEditWindow} from '../../../widgets/profileEditWindow/ui/profileEditWindow.js';

/**
 * ProfileEdit class to render profile edit page and handle events in it
 */
export class ProfileEdit extends View {
    /**
     * Initialize values in clas
     * @constructor
     * @param {Array} args – arguments to pass forward to View constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Render profile edit page
     * @function render
     * @param {json} user – JSON object with user info in it
     */
    render(user) {
        this.root.innerHTML = profileEditTemplate({});
        const profileEditWindow = new ProfileEditWindow();
        profileEditWindow.render(user);
    }
}
