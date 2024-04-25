import {View} from '../../../app/View.js';
import userFieldsTemplate from './userFields.handlebars';
import './userFields.scss';
import {
    emailValidation, errContentChange, errCustomize, inputValidate,
    nicknameValidation,
    passwordValidation, repPasswordValidation,
} from '../../../shared/utils/validation.js';
import {debounce} from '../../../shared/utils/debounce.js';
import {debounceTimeout, ERROR_COLOR} from '../../../shared/config.js';
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
                    }
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
                        content: '– Хотя бы одну заглавную букву'
                    }
                ],
                validationFunc: passwordValidation,
                errText: 'В поле введен невалидный пароль!',
            },
            'repPassword': {
                label: 'Повторите пароль',
                type: 'password',
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

        const nickname = new InputField('signup-nickname');
        nickname.render(this.errFields['nickname']);

        const email = new InputField('signup-email');
        email.render(this.errFields['email']);

        const password = new InputField('signup-password');
        password.render(this.errFields['password']);

        const repPassword = new InputField('signup-rep-password');
        repPassword.render(this.errFields['repPassword']);

        const nicknameInput = this.root.querySelector('#' + this.errFields.nickname.inputField);
        const passwordInput = this.root.querySelector('#' + this.errFields.password.inputField);
        const emailInput = this.root.querySelector('#' + this.errFields.email.inputField);
        const repeatPasswordInput = this.root.querySelector('#' + this.errFields.repPassword.inputField);
        const nickHint = this.root.querySelector('#' + this.errFields.nickname.hint);
        const passHint = this.root.querySelector('#' + this.errFields.password.hint);

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
            check(this.errFields.nickname, nickname);
        });

        emailInput.addEventListener('input', (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const check = debounce(inputValidate, debounceTimeout);
            check(this.errFields.email, email);
        });

        passwordInput.addEventListener('input', (event) => {
            event.preventDefault();
            const password = passwordInput.value;
            const check = debounce(inputValidate, debounceTimeout);
            check(this.errFields.password, password);
        });

        repeatPasswordInput.addEventListener('input', (event) => {
            event.preventDefault();
            const password = passwordInput.value;
            const repPassword = repeatPasswordInput.value;
            const check = debounce(inputValidate, debounceTimeout);
            check(this.errFields.repPassword, password, repPassword);
        });
    }

    takePostValues(){
        return {
            'email': this.root.querySelector('#' + this.errFields.email.inputField).value,
            'password': this.root.querySelector('#' + this.errFields.password.inputField).value,
            'nickname': this.root.querySelector('#' + this.errFields.nickname.inputField).value,
        }
    }

    errorCheck(){
        for (const [key, value] of new Map(Object.entries(this.errFields))) {
            const inputCont = [this.root.querySelector('#' + value.inputField).value];
            if (key === 'repPassword') {
                inputCont.push(this.root.querySelector('#' + this.errFields.password.inputField).value);
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

    addError(entity, errorContent){
        errContentChange(this.errFields[entity], errorContent);
        errCustomize(this.errFields[entity], ERROR_COLOR);
    }

}
