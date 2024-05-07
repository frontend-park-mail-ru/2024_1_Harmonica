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
import {UserFields} from '../../../features/userFields/index.js';

export class SignupView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }


    render() {
        this.root.innerHTML = signupTemplate({});

        const signupFields = new UserFields('signup-fields');
        signupFields.render();

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
