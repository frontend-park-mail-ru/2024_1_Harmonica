import {View} from '../../../app/View.js';
import ButtonTemplate from './button.handlebars';
import './button.scss';

export class ButtonView extends View{
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    render(content, classes, id) {
        this.root.innerHTML = ButtonTemplate({content, id});

        this.root.classList.add(...classes);
    }
}
