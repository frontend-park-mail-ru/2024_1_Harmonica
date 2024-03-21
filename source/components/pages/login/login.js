/** @module source/components/pages/login */

import {API} from '../../../modules/API.js';
import {Feed} from '../feed/feed.js';
import {Signup} from '../signup/signup.js';
import {Navbar} from '../../widget/navbar/navbar.js';
import {emailValidation, passwordValidation} from '../../../modules/validation.js';
import {ERROR_COLOR, errors} from '../../../modules/config.js';
import {Error} from '../error/error.js';
import templateLogin from './login.handlebars';

/** Errors fields selectors */
const errFields = [
    {
        errContent: '#login_email_error',
        inputField: '#login_email',
    },
    {
        errContent: '#login_password_error',
        inputField: '#login_password',
    }];

/**
 * Provides login view on site by rendering 'Handlebars.templates.login'.
 * @function Login
 * @async
 */
export const Login = () => {
    const root = document.getElementById('root');
    root.innerHTML = templateLogin({});

    const api = new API();
    const enterButton = root.querySelector('#login_enter_button');
    enterButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const email = root.querySelector('#login_email').value;
        const password = root.querySelector('#login_password').value;

        if (!emailValidation(email)) {
            errorHandle(root, '#login_email', 'Это не похоже на email!');
            return;
        }

        if (!passwordValidation(password)) {
            errorHandle(root, '#login_password', 'В поле введен невалидный пароль!');
            return;
        }

        const post = {'email': email, 'password': password};
        const response = await api.login(post);
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
        case 7:
            errorHandle(root, '#login_email', errors[7]);
            break;
        case 8:
            errorHandle(root, '#login_password', errors[8]);
            break;
        default:
            Error();
            break;
        }
    });

    const signupButton = root.querySelector('#login_signup_button');
    signupButton.addEventListener('click', () => {
        Signup();
    });
};

/**
* Set an error-style to block in login form by document.root and id of block.
* @function errorHandle
 * @param {Document.rootElement} root - Root object to modify
 * @param {string} blockID - Id of block to set error
 * @param {string} error - Error message
 */
const errorHandle = (root, blockID, error) =>{
    for (const block of errFields) {
        const input = root.querySelector(block.inputField);
        const errorField = root.querySelector(block.errContent);
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

/**
* Logout button handler: logouts user and refresh navbar
* @function Logout
* @async
 */
export const Logout = async () => {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        Error();
    }
    const api = new API();
    const response = await api.logout();
    if (response.code !== 0) {
        Error();
        return;
    }
    Navbar();
    Feed();
};
