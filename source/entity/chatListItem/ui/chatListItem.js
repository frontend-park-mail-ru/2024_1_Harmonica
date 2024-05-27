import chatListTemplate from './chatListItem.handlebars';
import './chatListItem.scss';
import {View} from '../../../app/View.js';
import {Avatar} from '../../avatar/ui/avatar.js';
import {API} from '../../../shared/api/API.js';
import {ErrorWindowView} from '../../errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';

export class ChatListItemView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    render(chat, url) {
        this.root.innerHTML = chatListTemplate({chat});
        const chatListItem = document.querySelector('#chat-list-item-' + chat.user.user_id);
        chatListItem.addEventListener('click', async (event) => {
            event.preventDefault();
            const api = new API('/messages/' + chat.user.user_id);
            const response = await api.post(JSON.stringify({'text': url}));
            if (response.code) {
                const error = new ErrorWindowView();
                error.render(errors['oops']);
                return;
            }
            const ev = new Event('modalClose');
            dispatchEvent(ev);
        });

        const avatar = new Avatar('chat-list-avatar', this.root);
        avatar.render(chat.user.avatar_url);
    }
}
