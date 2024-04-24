/** @module source/modules/validation */

import {ERROR_COLOR, NORMAL_COLOR} from '../config.js';
import {ErrorWindowView} from '../../entity/errorWindow/ui/errorWindow.js';

/**
 * Check if email is valid
 * @function emailValidation
 * @param {string} email - Email to check.
 * @return {boolean} True if email is valid and false otherwise.
 */
export const emailValidation = (email) => {
    const regular = new RegExp('^[a-zA-Z0-9]{1,64}' +
        '@([a-zA-Zа-яёА-ЯЁ0-9]{1,63}\\.[a-zA-Zа-яёА-ЯЁ0-9]{1,63})$', 'u');
    return regular.test(email);
};
/**
 * Check if password is valid
 * @function passwordValidation
 * @param {string} password - Password to check.
 * @return {boolean} True if password is valid and false otherwise.
 */
export const passwordValidation = (password) => {
    // let checks = {
    //     length: false,
    //     digit: false,
    //     upperCase: false,
    // };
    // if (/^[a-zA-Z0-9\-_]{8, 24}$/.test(password)){
    //     checks.length = true;
    // }
    // if (/^$/)
    return /[A-Z]+/.test(password) && /[0-9]+/.test(password) &&
      /^[a-zA-Z0-9]{8,24}$/.test(password);
};
/**
 * Checks if nickname is valid
 * @function nicknameValidation
 * @param {string} nick - Nickname to check.
 * @return {boolean} True if nickname is valid and false otherwise.
 */
export const nicknameValidation = (nick) => {
    const regular = new RegExp('^[0-9a-zA-Z_]{3,20}$');
    return regular.test(nick);
};
/**
 * Check if passwords are the same
 * @function repPasswordValidation
 * @param {string} pass - Password to compare with.
 * @param {string} repPass - Password to compare with.
 * @return {boolean} True if passwords are the same and false otherwise.
 */
export const repPasswordValidation = (pass, repPass) => pass === repPass;

export const boardValidation = (title, description) => {
    const errorView = new ErrorWindowView();

    if (title.value.length > 60){
        errorView.render('Количество символов в поле заголовок не должно превышать 60');
        title.style['border-color'] = ERROR_COLOR;
    } else if (description.value.length > 500) {
        title.style['border-color'] = NORMAL_COLOR;
        errorView.render('Количество символов в описание доски не должно превышать 500');
        description.style['border-color'] = ERROR_COLOR;
    } else {
        return true;
    }
    return false;
}

export const pinValidation = (title, description) => {
    const errorView = new ErrorWindowView();

    if (title.value.length > 60){
        errorView.render('Количество в заголовоке пина не должно превышать 60');
        title.style['border-color'] = ERROR_COLOR;
    } else if (description.value.length > 300) {
        title.style['border-color'] = NORMAL_COLOR;
        errorView.render('Количество символов в описание пина не должно превышать 300');
        description.style['border-color'] = ERROR_COLOR;
    } else {
        return true;
    }
    return false;
}

/**
 * Set error content to block
 * @function errContentChange
 * @param {Object} block - Block object to change
 * @param {string} content - Content to set
 */
export const errContentChange = (block, content) => {
    const errBlock = document.querySelector('#' + block.errContent);
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
export const errCustomize = (block, color) => {
    const input = document.querySelector('#' + block.inputField);
    const hint = document.querySelector('#' + block.hint);

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
export const inputValidate = (field, ...args) => {
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
