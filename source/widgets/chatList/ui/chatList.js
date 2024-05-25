import {View} from '../../../app/View.js';
import chatListTemplate from './chatList.handlebars';
import './chatList.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {ChatWindow} from '../../chatWindow/index.js';
import {API} from '../../../shared/api/API.js';

export class ChatList extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    async render() {
        const api = new API('/chats');
        const response = await api.get();
        const body = response.body;

        const chats = body.chats;

        this.root.innerHTML = chatListTemplate({chats});

        const window = new ChatWindow('chat-window');

        if (chats) {
            const listView = document.querySelector('#chat-list');
            const chatWindowView = document.querySelector('#chat-window');

            for (const chat of chats) {
                const avatar = new Avatar(`chat__avatar-${chat.user.user_id}`);
                avatar.render(chat.user.avatar_url);

                const chatElem = document.querySelector(`#chat-${chat.user.user_id}`);
                chatElem.addEventListener('click', async (event) => {
                    event.preventDefault();
                    if (this.currentChat) {
                        this.currentChat['inputValue'] = document.querySelector('#chat-input').value;
                    }
                    if (!this.currentChat || this.currentChat.user_id !== chat.user.user_id) {
                        await window.render(chat);
                        this.currentChat = chat.user;
                    }
                    listView.classList.replace('window-on-top', 'window-on-bottom');
                    chatWindowView.classList.replace('window-on-bottom', 'window-on-top');
                });
            }
        }
    }
}
