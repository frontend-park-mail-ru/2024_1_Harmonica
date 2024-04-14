import {View} from '../../../app/View.js';
import {
    emailValidation,
    nicknameValidation,
    passwordValidation, repPasswordValidation,
} from '../../../shared/utils/validation.js';
import signupTemplate from './signupView.handlebars';
import './signupView.scss';
import {debounce} from '../../../shared/utils/debounce.js';
import {debounceTimeout, ERROR_COLOR, errors} from '../../../shared/config.js';
import {Error} from '../../error/error.js';
import {NavbarView} from '../../../widgets/navbar/ui/navbar.js';
import {SignupAPI} from '../api/api.js';

export class SignupView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
        this.errFields = {
            'nickname': {
                errContent: '#signup_nickname_error',
                inputField: '#register_nickname',
                hint: '#nick_hint',
                validationFunc: nicknameValidation,
                errText: 'Имя пользователя неверно!',
            },
            'email': {
                errContent: '#signup_email_error',
                inputField: '#register_email',
                validationFunc: emailValidation,
                errText: 'Это не похоже на email!',
            },
            'password': {
                errContent: '#signup_password_error',
                inputField: '#register_password',
                hint: '#pass_hint',
                validationFunc: passwordValidation,
                errText: 'В поле введен невалидный пароль!',
            },
            'repPassword': {
                errContent: '#signup_repeat_password_error',
                inputField: '#register_repeat_password',
                validationFunc: repPasswordValidation,
                errText: 'Пароли не совпадают',
            },
        };
    }


    render() {
        this.root.innerHTML = signupTemplate({});

        const nicknameInput = this.root.querySelector(this.errFields.nickname.inputField);
        const passwordInput = this.root.querySelector(this.errFields.password.inputField);
        const emailInput = this.root.querySelector(this.errFields.email.inputField);
        const repeatPasswordInput = this.root.querySelector(this.errFields.repPassword.inputField);
        const nickHint = this.root.querySelector(this.errFields.nickname.hint);
        const passHint = this.root.querySelector(this.errFields.password.hint);

        nicknameInput.addEventListener('focus', (event) => {
            event.preventDefault();
            nickHint.style.visibility = 'visible';
        });

        passwordInput.addEventListener('focus', (event) => {
            event.preventDefault();
            passHint.style.visibility = 'visible';
        });

        nicknameInput.addEventListener('focusout', (event) => {
            event.preventDefault();
            if (nicknameValidation(nicknameInput.value)) {
                nickHint.style.visibility = 'hidden';
            }
        });

        passwordInput.addEventListener('focusout', (event) => {
            event.preventDefault();
            if (passwordValidation(passwordInput.value)) {
                passHint.style.visibility = 'hidden';
            }
        });

        nicknameInput.addEventListener('input', (event) => {
            event.preventDefault();
            const nickname = nicknameInput.value;
            const check = debounce(this.inputValidate, debounceTimeout);
            check(this.errFields.nickname, nickname);
        });

        emailInput.addEventListener('input', (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const check = debounce(this.inputValidate, debounceTimeout);
            check(this.errFields.email, email);
        });

        passwordInput.addEventListener('input', (event) => {
            event.preventDefault();
            const password = passwordInput.value;
            const check = debounce(this.inputValidate, debounceTimeout);
            check(this.errFields.password, password);
        });

        repeatPasswordInput.addEventListener('input', (event) => {
            event.preventDefault();
            const password = passwordInput.value;
            const repPassword = repeatPasswordInput.value;
            const check = debounce(this.inputValidate, debounceTimeout);
            check(this.errFields.repPassword, password, repPassword);
        });

        const api = new SignupAPI();
        const signupButton = this.root.querySelector('#signup_enter_button');
        signupButton.addEventListener('click', async (event) => {
            event.preventDefault();

            let errorCheck;

            for (const [key, value] of new Map(Object.entries(this.errFields))) {
                const inputCont = [this.root.querySelector(value.inputField).value];
                if (key === 'repPassword') {
                    inputCont.push(this.root.querySelector(this.errFields.password.inputField).value);
                }
                if (!value.validationFunc(...inputCont)) {
                    this.errContentChange(value, value.errText);
                    this.errCustomize(value, ERROR_COLOR);
                    errorCheck = true;
                } else {
                    this.errContentChange(value, '');
                    this.errCustomize(value, '');
                }
            }

            if (errorCheck) {
                return;
            }

            const post = {
                'email': emailInput.value,
                'password': passwordInput.value,
                'nickname': nicknameInput.value,
            };
            const response = await api.registerRequest(post);
            switch (response.code) {
            case 0:
                try {
                    localStorage.setItem('user', JSON.stringify(response.body));
                } catch (error) {
                    Error();
                }
                const navbar = new NavbarView();
                navbar.render();
                window.location.pathname = '/';
                break;
            case 51:
                for (const err of response.errors) {
                    switch (err.code) {
                    case 9:
                        this.errContentChange(this.errFields.email, errors[9]);
                        this.errCustomize(this.errFields.email, ERROR_COLOR);
                        break;
                    case 10:
                        this.errContentChange(this.errFields.nickname, errors[10]);
                        this.errCustomize(this.errFields.nickname, ERROR_COLOR);
                        break;
                    default:
                        Error();
                        break;
                    }
                }
                break;
            default:
                Error();
                break;
            }
        });

        const loginButton = this.root.querySelector('#signup_login_button');
        loginButton.addEventListener('click', () => {
            window.location.pathname = '/login'
        });
    }

    /**
     * Set error content to block
     * @function errContentChange
     * @param {Object} block - Block object to change
     * @param {string} content - Content to set
     */
    errContentChange(block, content) {
        const errBlock = document.querySelector(block.errContent);
        if (errBlock.innerHTML !== content) {
            errBlock.innerHTML = content;
        }
    };

    /**
     * Sets error-style to block with specified color
     * @function errCustomize
     * @param {Object} block - Block object to change
     * @param {string} color - Color to set
     */
    errCustomize(block, color) {
        const input = document.querySelector(block.inputField);
        const hint = document.querySelector(block.hint);

        input.style.borderColor = color;
        input.style.outlineColor = color;

        if (hint) {
            hint.style.borderColor = color;
            hint.style.color = color;
        }
    };

    /**
     * Function provides validation of input and changes style of blocks if error detected
     * @function inputValidate
     * @param {Object} field - Object with: IDs of blocks where to display error/hint,
     * validation function and message content
     * @param {*} args - Arguments that needed to be passed in validation function
     */
    inputValidate(field, ...args){
        const hint = document.querySelector(field.hint);
        if (!field.validationFunc(...args)) {
            this.errContentChange(field, field.errText);
            this.errCustomize(field, ERROR_COLOR);
            if (hint) {
                hint.style.visibility = 'visible';
            }
        } else {
            this. errContentChange(field, '');
            this.errCustomize(field, '');
        }
    };
}
