/** @module source/components/pages/signup */

import {API} from '../../../modules/API.js';
import {Login} from '../login/login.js';
import {emailValidation, nicknameValidation, passwordValidation, repPasswordValidation}
    from '../../../modules/validation.js';
import {ERROR_COLOR, errors, debounceTimeout} from '../../../modules/config.js';
import {Error} from '../error/error.js';
import {Navbar} from '../../widget/navbar/navbar.js';
import {Feed} from '../feed/feed.js';
import {debounce} from '../../../modules/debounce.js';

/** Errors fields selectors, info and messages */
const errFields = {
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

/**
 * Provides register view on site by rendering 'Handlebars.templates.signup'.
 * @function Signup
 */
export const Signup = () => {
    const template = Handlebars.templates.signup;
    const root = document.getElementById('root');
    root.innerHTML = template({});

    const nicknameInput = root.querySelector(errFields.nickname.inputField);
    const passwordInput = root.querySelector(errFields.password.inputField);
    const emailInput = root.querySelector(errFields.email.inputField);
    const repeatPasswordInput = root.querySelector(errFields.repPassword.inputField);
    const nickHint = root.querySelector(errFields.nickname.hint);
    const passHint = root.querySelector(errFields.password.hint);

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
        const check = debounce(inputValidate, debounceTimeout);
        check(errFields.nickname, nickname);
    });

    emailInput.addEventListener('input', (event) => {
        event.preventDefault();
        const email = emailInput.value;
        const check = debounce(inputValidate, debounceTimeout);
        check(errFields.email, email);
    });

    passwordInput.addEventListener('input', (event) => {
        event.preventDefault();
        const password = passwordInput.value;
        const check = debounce(inputValidate, debounceTimeout);
        check(errFields.password, password);
    });

    repeatPasswordInput.addEventListener('input', (event) => {
        event.preventDefault();
        const password = passwordInput.value;
        const repPassword = repeatPasswordInput.value;
        const check = debounce(inputValidate, debounceTimeout);
        check(errFields.repPassword, password, repPassword);
    });

    const api = new API();
    const signupButton = root.querySelector('#signup_enter_button');
    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let errorCheck;

        for (const [key, value] of new Map(Object.entries(errFields))) {
            const inputCont = [root.querySelector(value.inputField).value];
            if (key === 'repPassword') {
                inputCont.push(root.querySelector(errFields.password.inputField).value);
            }
            if (!value.validationFunc(...inputCont)) {
                errContentChange(value, value.errText);
                errCustomize(value, ERROR_COLOR);
                errorCheck = true;
            } else {
                errContentChange(value, '');
                errCustomize(value, '');
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
        const response = await api.signup(post);
        switch (response.code) {
        case 0:
            try {
                localStorage.setItem('user', JSON.stringify(response.body));
            } catch (error) {
                Error();
            }
            Navbar();
            Feed();
            break;
        case 51:
            for (const err of response.errors) {
                switch (err.code) {
                case 9:
                    errContentChange(errFields.email, errors[9]);
                    errCustomize(errFields.email, ERROR_COLOR);
                    break;
                case 10:
                    errContentChange(errFields.nickname, errors[10]);
                    errCustomize(errFields.nickname, ERROR_COLOR);
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

    const loginButton = root.querySelector('#signup_login_button');
    loginButton.addEventListener('click', () => {
        Login();
    });
};

/**
 * Set error content to block
 * @function errContentChange
 * @param {Object} block - Block object to change
 * @param {string} content - Content to set
 */
const errContentChange = (block, content) => {
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
const errCustomize = (block, color) => {
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
const inputValidate = (field, ...args) => {
    const hint = document.querySelector(field.hint);
    if (!field.validationFunc(...args)) {
        errContentChange(field, field.errText);
        errCustomize(field, ERROR_COLOR);
        if (hint) {
            hint.style.visibility = 'visible';
        }
    } else {
        errContentChange(field, '');
        errCustomize(field, '');
    }
};
