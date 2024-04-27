import {View} from '../../../app/View.js';
import csatWindowTemplate from './csatWindow.handlebars';
import './csatWindow.scss';

export class CsatWindow extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#error-block');
    }

    render() {
        this.root.innerHTML = csatWindowTemplate({});

        const cancelButton = document.querySelector('#modal-cancel');
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.root.innerHTML = null;
        }, {once: true});
    }
}
