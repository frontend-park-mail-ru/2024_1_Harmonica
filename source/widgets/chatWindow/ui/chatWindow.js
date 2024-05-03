import {View} from '../../../app/View.js';
import chatWindowTemplate from './chatWindow.handlebars';
import './chatWindow.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {API} from '../../../shared/api/API.js';
import {MessagesFeedView} from '../../../features/messagesFeed/ui/messagesFeed.js';

export class ChatWindow extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    async render(user = {}) {
        let messages = null;
        if (user && user.user_id) {
            const api = new API(`/messages/${user.user_id}`);
            const response = await api.get();
            messages = response.body.messages;
        }
        this.root.innerHTML = chatWindowTemplate({user});

        if (user && user.user_id) {
            const avatar = new Avatar('chat__selected-avatar');
            avatar.render(user.avatar_url);

            const messageView = new MessagesFeedView('chat-messages');
            messageView.render(messages);
        }
    }
}
