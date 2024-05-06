import pinInfoBlockTemplate from './pinInformationBlock.handlebars';
import './pinInformationBlock.scss';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {PinAddToBoardView} from '../../../pages/pinAddToBoard/ui/pinAddToBoard.js';

/**
 * Handle information in pins page
 */
export class PinInformationBlock extends View {
    /**
     * Initialize values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-block-top');
    }

    /**
     * Render pins info block
     * @function render
     * @param {json} pin – pin info
     */
    render(pin) {
        const user = JSON.parse(localStorage.getItem('user'));
        this.root.innerHTML = pinInfoBlockTemplate({pin, user});
        const avatar = new Avatar();
        avatar.render(pin.author.avatar_url);

        const avatarObj = document.querySelector('#avatar');
        avatarObj.addEventListener('click', async (event) => {
            event.preventDefault();
            history.pushState(null, null, '/profile/' + pin.author.nickname);
        },
        );

        if (user) {
            const boardAdd = document.querySelector('#pin-board-add');
            boardAdd.addEventListener('click', async (event) => {
                event.preventDefault();
                const addPin = new PinAddToBoardView();
                await addPin.render(pin);
                const modal = document.querySelector('#dialog-window');
                modal.showModal();
            });
        }
    }
}
