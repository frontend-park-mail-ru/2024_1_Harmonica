import {View} from '../../../app/View.js';
import inputFieldTemplate from './inputField.handlebars';
import './inputField.scss';
import {debounce} from '../../../shared/utils/debounce.js';
import {inputValidate} from '../../../shared/utils/validation.js';
import {debounceTimeout} from '../../../shared/config.js';

export class InputField extends View {
    constructor(field, inputID, ...args) {
        super(...args);
        this.field = field;
        this.root = document.querySelector('#' + inputID);
    }

    render(blockID) {
        this.root.innerHTML = inputFieldTemplate({
                field: this.field,
                isPassword: this.field.type === 'password',
        });
        const input = this.root.querySelector('#' + this.field.inputField);
        if (this.field.hint) {
            const hint = this.root.querySelector('#' + this.field.hint);
            input.addEventListener('focus', (event) => {
                event.preventDefault();
                hint.style.visibility = 'visible';
            });
            input.addEventListener('focusout', (event) => {
                event.preventDefault();
                if (this.field.validationFunc(input.value)) {
                    hint.style.visibility = 'hidden';
                }
            });
        }
        input.addEventListener('input', (event) => {
            event.preventDefault();
            const value = input.value;
            const check = debounce(inputValidate, debounceTimeout);
            if (this.field.repeat) {
                const repeatInput = document.querySelector('#' + this.field.repeat);
                check(this.field, value, repeatInput.value);
                return;
            }
            check(this.field, value);
        });
        if (this.field.type === 'password') {
            const eyeButton = this.root.querySelector('#eye');

            const eyeOpen = document.querySelector('#eye-open');
            const eyeClosed = document.querySelector('#eye-closed');
            eyeButton.addEventListener('click', () => {
                if (input.type === 'password'){
                    eyeOpen.classList.add('eye__visibility-hidden');
                    eyeClosed.classList.remove('eye__visibility-hidden');
                    input.type = 'text';
                } else {
                    eyeOpen.classList.remove('eye__visibility-hidden');
                    eyeClosed.classList.add('eye__visibility-hidden');
                    input.type = 'password';
                }
            });
        }
    }
}
