import {API} from '../../../modules/API.js';
import {Login} from '../login/login.js';
import {emailValidation, nicknameValidation, passwordValidation}
    from '../../../modules/validation.js';
import {ERROR_COLOR, errors} from '../../../modules/config.js';
import {Error} from '../error/error.js';
import {Navbar} from '../../widget/navbar/navbar.js';
import {Feed} from '../feed/feed.js';

const errFields = {
    'nickname': {
        errContent: '#signup_nickname_error',
        inputField: '#register_nickname',
    },
    'email': {
        errContent: '#signup_email_error',
        inputField: '#register_email',
    },
    'password': {
        errContent: '#signup_password_error',
        inputField: '#register_password',
    },
    'repPassword': {
        errContent: '#signup_repeat_password_error',
        inputField: '#register_repeat_password',
    },
};
export const Signup = () => {
    const template = Handlebars.templates.signup;
    const root = document.getElementById('root');
    root.innerHTML = template({});

    const api = new API();
    const signupButton = root.querySelector('#signup_enter_button');
    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const nickname = root.querySelector('#register_nickname').value;
        const email = root.querySelector('#register_email').value;
        const password = root.querySelector('#register_password').value;
        const repeatPassword = root.querySelector('#register_repeat_password').value;

        let errorCheck;

        if (!nicknameValidation(nickname)) {
            errAdd(root, errFields.nickname, 'Имя пользователя неверно!');
            errorCheck = true;
        } else {
            errRemove(root, errFields.nickname);
        }

        if (!emailValidation(email)) {
            errAdd(root, errFields.email, 'Это не похоже на email!');
            errorCheck = true;
        } else {
            errRemove(root, errFields.email);
        }

        if (!passwordValidation(password)) {
            errAdd(root, errFields.password, 'В поле введен невалидный пароль!');
            errAdd(root, errFields.repPassword, '');
            errorCheck = true;
        } else if (password !== repeatPassword) {
            errAdd(root, errFields.password, 'Пароли не совпадают');
            errAdd(root, errFields.repPassword, '');
            errorCheck = true;
        } else {
            errRemove(root, errFields.password);
            errRemove(root, errFields.repPassword);
        }

        if (errorCheck) {
            return;
        }

        const post = {'email': email, 'password': password, 'nickname': nickname};
        const response = await api.signup(post);
        if (response.status >= 400) {
            switch (response.body.code) {
            case 9:
                errAdd(root, errFields.email, errors[9]);
                break;
            case 10:
                errRemove(root, errFields.email);
                errAdd(root, errFields.nickname, errors[10]);
                break;
            default:
                Error(response);
                break;
            }
        } else {
            localStorage.setItem('user', JSON.stringify(response.body));
            Navbar();
            Feed();
        }
    });

    const loginButton = root.querySelector('#signup_login_button');
    loginButton.addEventListener('click', () => {
        Login();
    });
};


const errAdd = (root, block, error) => {
    const errBlock = root.querySelector(block.errContent);
    const input = root.querySelector(block.inputField);
    if (errBlock.innerHTML !== error) {
        errBlock.innerHTML = error;
    }
    input.style.borderColor = ERROR_COLOR;
    input.style.outlineColor = ERROR_COLOR;
};

const errRemove = (root, block) => {
    const errBlock = root.querySelector(block.errContent);
    const input = root.querySelector(block.inputField);
    if (errBlock.innerHTML !== '') {
        errBlock.innerHTML = '';
    }
    input.style.borderColor = '';
    input.style.outlineColor = '';
};
