import {View} from '../../../app/View.js';
import userFieldsTemplate from './userFields.handlebars';
import './userFields.scss';
import {
    emailValidation, errContentChange, errCustomize,
    nicknameValidation,
    passwordValidation, repPasswordValidation,
} from '../../../shared/utils/validation.js';
import {ERROR_COLOR} from '../../../shared/config.js';
import {InputField} from '../../../entity/inputField/ui/inputField.js';

export class UserFields extends View {
    constructor(elementID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${elementID}`);
        this.errFields = {
            'nickname': {
                label: 'Имя пользователя',
                type: 'text',
                placeholder: 'Nickname',
                value: '',
                errContent: 'signup_nickname_error',
                inputField: 'register_nickname',
                hint: 'nick_hint',
                hintFields: [
                    {
                        id: 'length',
                        content: '– От 3 до 20 символов',
                    },
                    {
                        id: 'latin',
                        content: '– Только латинские буквы и цифры',
                    },
                ],
                validationFunc: nicknameValidation,
                errText: 'Имя пользователя неверно!',
            },
            'email': {
                label: 'Email',
                type: 'email',
                placeholder: 'example@mail.com',
                value: '',
                errContent: 'signup_email_error',
                inputField: 'register_email',
                validationFunc: emailValidation,
                errText: 'Это не похоже на email!',
            },
            'password': {
                label: 'Пароль',
                type: 'password',
                placeholder: 'Введите пароль',
                value: '',
                errContent: 'signup_password_error',
                inputField: 'register_password',
                hint: 'pass_hint',
                hintFields: [
                    {
                        id: 'length',
                        content: '– Длина от 8 до 24 символов',
                    },
                    {
                        id: 'digit',
                        content: '– Хотя бы одну цифру',
                    },
                    {
                        id: 'upperCase',
                        content: '– Хотя бы одну заглавную букву',
                    },
                ],
                validationFunc: passwordValidation,
                errText: 'В поле введен невалидный пароль!',
            },
            'repPassword': {
                label: 'Повторите пароль',
                type: 'password',
                repeat: 'register_password',
                placeholder: 'Введите пароль повторно',
                value: '',
                errContent: 'signup_repeat_password_error',
                inputField: 'register_repeat_password',
                validationFunc: repPasswordValidation,
                errText: 'Пароли не совпадают',
            },
        };
    }

    render() {
        this.root.innerHTML = userFieldsTemplate({});

        const nickname = new InputField(this.errFields['nickname'], 'signup-nickname');
        nickname.render();

        const email = new InputField(this.errFields['email'], 'signup-email');
        email.render();

        const password = new InputField(this.errFields['password'], 'signup-password');
        password.render();

        const repPassword = new InputField(this.errFields['repPassword'], 'signup-rep-password');
        repPassword.render();
    }

    takePostValues() {
        return {
            'email': this.root.querySelector('#' + this.errFields.email.inputField).value,
            'password': this.root.querySelector('#' + this.errFields.password.inputField).value,
            'nickname': this.root.querySelector('#' + this.errFields.nickname.inputField).value,
        };
    }

    errorCheck() {
        for (const [key, value] of new Map(Object.entries(this.errFields))) {
            const inputCont = [this.root.querySelector('#' + value.inputField).value];
            if (key === 'repPassword') {
                inputCont.push(this.root.querySelector('#' +
                    this.errFields['password'].inputField).value);
            }
            if (!value.validationFunc(...inputCont)) {
                errContentChange(value, value.errText);
                errCustomize(value, ERROR_COLOR);
                return true;
            } else {
                errContentChange(value, '');
                errCustomize(value, '');
            }
        }
        return false;
    }

    addError(entity, errorContent) {
        errContentChange(this.errFields[entity], errorContent);
        errCustomize(this.errFields[entity], ERROR_COLOR);
    }
}
