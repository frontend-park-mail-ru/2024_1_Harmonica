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

        this.root.addEventListener('mousedown', (event) => {
            if (event.target === this.root) {
                this.root.close();
            }
        });

        const list = new BlockView('modal-list');
        await list.render(...args);
        this.root.showModal();

        const close = document.querySelector('#modal-close');
        close.addEventListener('click', () => {
            this.root.close();
        });

        window.navigation.addEventListener('navigate', () => {
            this.root.close();
        });
    }

    close(){
        this.root.close();
    }
}
