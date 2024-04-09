import profileEditWindowTemplate from './profileEditWindow.handlebars';
import './profile-edit-window.css';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {Profile} from '../../../pages/profile/ui/profile.js';
import {ProfileEditAPI} from '../api/api.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';

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
            await profile.render(user.nickname);
        })

        const uploadInput = document.querySelector('#profile-photo-input');
        uploadInput.addEventListener('change', (event) => {
            event.preventDefault();
            const image = uploadInput.files[0];
            if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    avatar.render(event.target.result);
                }
                reader.readAsDataURL(image);
            }
        });

        const saveButton = document.querySelector('#profile-edit-save');
        saveButton.addEventListener('click', async (event) =>{
            event.preventDefault();
            const email = this.root.querySelector('#input-email').value;
            const nickname = this.root.querySelector('#input-nickname').value;
            const password = this.root.querySelector('#input-password').value;
            const repeatPassword = this.root.querySelector('#input-repeat-password').value;
            const userInfo = {email, nickname, password};

            const uploadInput = document.querySelector('#profile-photo-input');
            const image = uploadInput.files[0];
            const formData = new FormData();
            formData.append('image', image);
            formData.append('user', JSON.stringify(userInfo));

            const profileEditAPI = new ProfileEditAPI(user.user_id);
            const response = await profileEditAPI.api(formData);

            if(response.code){
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const profile = new Profile();
            await profile.render(response.body.nickname);
        });
    }
}
