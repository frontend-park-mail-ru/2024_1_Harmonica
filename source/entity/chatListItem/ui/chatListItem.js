import chatListTemplate from './chatListItem.handlebars';
import './chatListItem.scss';
import {View} from '../../../app/View.js';
import {Avatar} from '../../avatar/ui/avatar.js';

export class ChatListItemView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    render(chat, url) {
        this.root.innerHTML = chatListTemplate({chat});
        const chatListItem = document.querySelector('#chat-list-item');
        chatListItem.addEventListener('click', (event) => {
            event.preventDefault();
            const api = new API('/messages/' + chat.user.user_id);
            api.post({'text': url});
        });

        const avatar = new Avatar('chat-list-avatar', this.root);
        avatar.render(chat.user.avatar_url);
    }
}
