import pinInfoBlockTemplate from './pinInformationBlock.handlebars';
import './pinInformationBlock.scss';
import {View} from '../../../app/View.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {API} from '../../../shared/api/API.js';
import {ModalListWindowView} from '../../../widgets/modalWindow/ui/modalWindow.js';
import {ListBlockView} from '../../listBlock/ui/listBlock.js';
import {ChatListItemView} from '../../../entity/chatListItem/ui/chatListItem.js';

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

        const userObj = document.querySelector('#pin__user-info');
        userObj.addEventListener('click', async (event) => {
            event.preventDefault();
            history.pushState(null, null, '/profile/' + pin.author.nickname);
        });

        const sharedButton = document.querySelector('#pin-shared-button');
        sharedButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const api = new API('/chats');
            const response = await api.get();


            const chatsList = new ModalListWindowView();
            chatsList.render(ListBlockView, response.body.chats, ChatListItemView,
                'https://harmoniums.ru/pin/' + pin.pin_id);
        });
    }
}
