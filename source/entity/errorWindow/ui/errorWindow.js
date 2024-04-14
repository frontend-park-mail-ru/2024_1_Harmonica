import {View} from '../../../app/View.js';
import errorViewTemplate from './errorWindow.handlebars';
import './errorWindow.scss';

export class ErrorWindowView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#error-block');
    }

    render(message){
        this.root.innerHTML = errorViewTemplate({message});

        const cancelButton = document.querySelector('#error-cancel');
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.root.innerHTML = null;
        }, {once: true});
    }
}
