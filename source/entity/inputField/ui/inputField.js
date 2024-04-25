import {View} from '../../../app/View.js';
import inputFieldTemplate from './inputField.handlebars';
import './inputField.scss';

export class InputField extends View{
    constructor(inputID, ...args) {
        super(...args);
        this.root = document.querySelector('#' + inputID);

    }

    render(field) {
        this.root.innerHTML = inputFieldTemplate({field});
    }

}
