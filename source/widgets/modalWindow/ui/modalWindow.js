import {View} from '../../../app/View.js';
import modalListWindowTemplate from './modalWindow.handlebars';
import './modalWindow.scss';

export class ModalListWindowView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#dialog-window');
    }

    async render(BlockView, ...args) {
        this.root.innerHTML = modalListWindowTemplate({});

        const bodyItem = document.querySelector('#body');
        bodyItem.classList.add('modal-open');

        this.root.addEventListener('mousedown', (event) => {
            if (event.target === this.root) {
                this.close();
            }
        });

        const list = new BlockView('modal-list');
        await list.render(...args);
        this.root.showModal();

        const close = document.querySelector('#modal-close');
        close.addEventListener('click', () => {
            this.close();
        });

        window.navigation.addEventListener('navigate', () => {
            this.close();
        });

        addEventListener('modalClose', (event) => {
            event.preventDefault();
            this.close();
        });
    }

    close() {
        const bodyItem = document.querySelector('#body');
        bodyItem.classList.remove('modal-open');
        this.root.close();
    }
}
