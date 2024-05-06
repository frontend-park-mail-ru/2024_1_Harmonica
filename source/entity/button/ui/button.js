import {View} from '../../../app/View.js';
import buttonTemplate from './button.handlebars';
import './button.scss';

export class ButtonView extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    render(content, classes, id) {
        this.root.innerHTML = buttonTemplate({content, id});

        const button = this.root.querySelector(`#${id}`);
        button.classList.add(...classes);
    }
}
