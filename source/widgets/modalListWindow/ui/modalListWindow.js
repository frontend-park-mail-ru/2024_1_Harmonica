import {View} from '../../../app/View.js';
import modalListWindowTemplate from './modalListWindow.handlebars';
import './modalListWindow.scss';
import {ListBlockView} from '../../../features/listBlock/ui/listBlock.js';

export class ModalListWindowView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#dialog-window');
    }

    render(objects, RenderEntity) {
        this.root.innerHTML = modalListWindowTemplate({});

        this.root.addEventListener('mousedown', (event) => {
            if (event.target === this.root){
                this.root.close();
            }
        })

        const list = new ListBlockView('modal-list');
        list.render(objects, RenderEntity);
        this.root.showModal();

        const close = document.querySelector('#modal-close');
        close.addEventListener('click', () => {
            this.root.close();
        });

        window.navigation.addEventListener('navigate', () => {
            this.root.close();
        });
    }
}
