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
        this.root.innerHTML = inputFieldTemplate({field: this.field, isPassword: this.field.type === 'password'});
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
            check(this.field, value);
        });
        if (this.field.type === 'password') {
            const eyeButton = this.root.querySelector('#eye');
            eyeButton.addEventListener('click', () => {
                eyeButton.classList.toggle('slash');
            });
        }
    }
}
