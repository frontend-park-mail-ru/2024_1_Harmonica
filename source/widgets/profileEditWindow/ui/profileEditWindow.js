import profileEditWindowTemplate from './profileEditWindow.handlebars';
import './profile-edit-window.scss';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {Profile} from '../../../pages/profile/ui/profile.js';
import {ProfileEditAPI} from '../api/api.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {ERROR_COLOR, errors, NORMAL_COLOR} from '../../../shared/config.js';
import {NavbarView} from '../../navbar/ui/navbar.js';
import {
    emailValidation,
    nicknameValidation,
    passwordValidation, repPasswordValidation,
} from '../../../shared/utils/validation.js';

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
        });

        const uploadInput = document.querySelector('#profile-photo-input');
        uploadInput.addEventListener('change', (event) => {
            event.preventDefault();
            const image = uploadInput.files[0];

            const fileExtention = (/[.]/.exec(image.name)) ?
                /[^.]+$/.exec(image.name) : null;
            if (fileExtention && !fileExtention[0].match(/^(png)|(jpg)|(jpeg)/)){
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[18]);
            } else if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    avatar.render(event.target.result);
                };
                reader.readAsDataURL(image);
            }
        });

        const saveButton = document.querySelector('#profile-edit-save');
        saveButton.addEventListener('click', async (event) =>{
            event.preventDefault();
            const email = this.root.querySelector('#input-email');
            const nickname = this.root.querySelector('#input-nickname');
            const password = this.root.querySelector('#input-password');
            const repeatPassword = this.root.querySelector('#input-repeat-password');
            const userInfo = {email: email.value, nickname: nickname.value, password: password.value};

            const errorView = new ErrorWindowView();

            let check = true;

            if (!nicknameValidation(nickname.value)){
                errorView.render('Никнейм должен содержать:\n– От 3 до 20 символов' +
                    '\n– Только латинские буквы и цифры\n– Разрешен символ \'_\'');
                nickname.style['border-color'] = ERROR_COLOR;
                check = false;
            } else {
                nickname.style['border-color'] = NORMAL_COLOR;
            }

            if (check && password.value !== '' &&!passwordValidation(password.value)){
                errorView.render('Требования к паролю:\n' +
                    '                        – Длина от 8 до 24 символов\n' +
                    '                        – Только латинские буквы\n' +
                    '                        – Хотя бы одну заглавную букву\n' +
                    '                        – Хотя бы одну цифру');
                password.style['border-color'] = ERROR_COLOR;
                check = false;
            } else {
                if (!repPasswordValidation(password.value, repeatPassword.value)){
                    errorView.render('Пароли не совпадают');
                    password.style['border-color'] = ERROR_COLOR;
                    repeatPassword.style['border-color'] = ERROR_COLOR;
                    check = false;
                } else {
                    password.style['border-color'] = NORMAL_COLOR;
                    repeatPassword.style['border-color'] = NORMAL_COLOR;
                }
            }

            if (check) {
                const uploadInput = document.querySelector('#profile-photo-input');
                const image = uploadInput.files[0];
                const formData = new FormData();
                formData.append('image', image);
                formData.append('user', JSON.stringify(userInfo));

                const profileEditAPI = new ProfileEditAPI(user.user_id);
                const response = await profileEditAPI.api(formData);

                if (response.code) {
                    const errorWindow = new ErrorWindowView();
                    errorWindow.render(errors[response.code]);
                    return;
                }

                localStorage.setItem('user', JSON.stringify(response.body));
                const navbar = new NavbarView();
                navbar.render();

                window.location.pathname = '/profile/' + response.body.nickname;
            }
        });
    }
}
