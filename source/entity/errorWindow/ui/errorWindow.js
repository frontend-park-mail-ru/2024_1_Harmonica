import {View} from '../../../app/View.js';
import errorViewTemplate from './errorWindow.handlebars';
import './errorWindow.scss';
import {errors} from '../../../shared/config.js';

/** Error window view */
export class ErrorWindowView extends View {
    /**
    * Default view constructor.
    * @constructor
    * @param {Element} root - Element in which to paste.
    * @param {...any} args - args for constructor of view.
    */
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#error-block');
    }

    /**
    * Renders view by error message.
    * @param {string} message - Error message entity.
    */
    render(message) {
        if (!message) {
            message = errors['oops'];
        }
        this.root.innerHTML = errorViewTemplate({message});

        const cancelButton = document.querySelector('#error-cancel');
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.root.innerHTML = null;
        }, {once: true});
    }
}
