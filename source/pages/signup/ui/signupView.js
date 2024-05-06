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
import {NavbarView} from '../../../widgets/navbar/ui/navbar.js';
import {SignupAPI} from '../api/api.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import WebSocketService from '../../../shared/api/WebSocket.js';

export class SignupView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
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
            // if (nicknameValidation(nicknameInput.value)) {
            nickHint.style.visibility = 'hidden';
            // }
        });

        passwordInput.addEventListener('focusout', (event) => {
            event.preventDefault();
            // if (passwordValidation(passwordInput.value)) {
            passHint.style.visibility = 'hidden';
            // }
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

            if (signupFields.errorCheck()) {
                return;
            }

            const post = signupFields.takePostValues();
            const response = await api.registerRequest(post);
            switch (response.code) {
            case 0:
                try {
                    localStorage.setItem('user', JSON.stringify(response.body));
                    WebSocketService.initialize();
                } catch (error) {
                    const errorWindow = new ErrorWindowView();
                    errorWindow.render(errors[60]);
                    return;
                }
                const navbar = new NavbarView();
                navbar.render();
                history.pushState(null, null, '/');
                break;
            case 51:
                for (const err of response.errors) {
                    switch (err.code) {
                    case 9:
                        signupFields.addError('email', errors[9]);
                        break;
                    case 10:
                        signupFields.addError('nickname', errors[10]);
                        break;
                    default:
                        const errorWindow = new ErrorWindowView();
                        errorWindow.render(errors[response.code]);
                        break;
                    }
                }
                break;
            default:
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                break;
            }
        });

        const loginButton = this.root.querySelector('#signup_login_button');
        loginButton.addEventListener('click', () => {
            history.pushState(null, null, '/login');
        });
    }
}
