import loginTemplate from './loginView.handlebars'
import './loginView.scss';
import {View} from '../../../app/View.js';
import {emailValidation, passwordValidation} from '../../../shared/utils/validation.js';
import {Error} from '../../../components/pages/error/error.js';
import {ERROR_COLOR, errors} from '../../../shared/config.js';
import {Signup} from '../../../components/pages/signup/signup.js';
import {LoginAPI} from '../api/api.js';

export class LoginView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
        this.errFields = [
            {
                errContent: '#login_email_error',
                inputField: '#login_email',
            },
            {
                errContent: '#login_password_error',
                inputField: '#login_password',
            }
        ];
    }

    render() {
        this.root.innerHTML = loginTemplate({});

        const enterButton = this.root.querySelector('#login_enter_button');
        enterButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const email = this.root.querySelector('#login_email').value;
            const password = this.root.querySelector('#login_password').value;

            if (!emailValidation(email)) {
                this.errorHandle('#login_email', 'Это не похоже на email!');
                return;
            }

            if (!passwordValidation(password)) {
                this.errorHandle('#login_password', 'В поле введен невалидный пароль!');
                return;
            }

            const post = {'email': email, 'password': password}
            const api = new LoginAPI()
            const response = await api.loginRequest(post);
            switch (response.code) {
            case 0:
                try {
                    localStorage.setItem('user', JSON.stringify(response.body));
                } catch (error) {
                    Error();
                }
                window.location.pathname = '/';
                break;
            case 7:
                this.errorHandle('#login_email', errors[7]);
                break;
            case 8:
                this.errorHandle('#login_password', errors[8]);
                break;
            default:
                Error();
                break;
            }
        });

        const signupButton = this.root.querySelector('#login_signup_button');
        signupButton.addEventListener('click', () => {
            Signup();
        });
    }

    errorHandle (blockID, error) {
        for (const block of this.errFields) {
            const input = this.root.querySelector(block.inputField);
            const errorField = this.root.querySelector(block.errContent);
            if (block.inputField !== blockID) {
                input.style.outlineColor = '';
                input.style.borderColor = '';
                errorField.innerHTML = '';
                continue;
            }
            input.style.outlineColor = ERROR_COLOR;
            input.style.borderColor = ERROR_COLOR;
            if (errorField.innerHTML !== error) {
                errorField.innerHTML = error;
            }
        }
    };
}
