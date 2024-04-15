import {View} from '../../../app/View.js';
import BoardPinFeedTemplate from './boardPin.handlebars';
import './boardPin.scss';
import {API} from '../../../shared/api/API.js';

export class BoardPinFeedView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    onClick(pinID) {
        window.location.pathname = '/pin/' + pinID;
    }

    render(pin, board) {
        this.root.innerHTML = BoardPinFeedTemplate({pin, owner: board.is_owner});

        const eventRoot = document.querySelector('#pin-' + pin.pin_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(pin.pin_id);
        });

        const delBtn = document.querySelector('#pin-del-' + pin.pin_id);
        delBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const api = new API('/boards/' + board.board_id + '/pins/' + pin.pin_id);
            await api.DELETE();
            window.location.pathname = '/board/' + board.board_id;
        });
    }
}
