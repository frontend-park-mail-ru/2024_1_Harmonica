import {View} from '../../../app/View.js';
import chatListTemplate from './chatList.handlebars';
import './chatList.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';

export class ChatList extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    render(avatarUrl) {
        const chats = [
            {
                chat_id: 1,
                chat_avatar_url: '',
                chat_nickname: 'New nick',
            },
            {
                chat_id: 2,
                chat_avatar_url: '',
                chat_nickname: 'New nick 2',
            },
        ];
        this.root.innerHTML = chatListTemplate({chats});
        for (const chat of chats) {
            const avatar = new Avatar(`chat__avatar-${chat.chat_id}`);
            avatar.render();
        }
    }
}
