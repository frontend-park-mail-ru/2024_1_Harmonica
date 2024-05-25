import {View} from '../../../app/View.js';
import chatListTemplate from './chatList.handlebars';
import './chatList.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';

export class ChatList extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    async render(chats) {
        this.root.innerHTML += chatListTemplate({chats});
        for (const chat of chats) {
            const avatar = new Avatar(`chat__avatar-${chat.user.user_id}`);
            avatar.render(chat.user.avatar_url);
        }
    }
}
