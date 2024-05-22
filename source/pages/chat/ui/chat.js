import {View} from '../../../app/View.js';
import chatTemplate from './chat.handlebars';
import './chat.scss';
import {ChatList} from '../../../widgets/chatList/index.js';
import {ChatWindow} from '../../../widgets/chatWindow/index.js';
import {API} from '../../../shared/api/API.js';

export class ChatView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
        this.currentChat = null;
    }

    async render() {
        this.root.innerHTML = chatTemplate({});

        const api = new API('/chats');
        const response = await api.get();
        const body = response.body;

        // const follow = body.subscriptions_users ? body.subscriptions_users : [];
        // const other = body?.other_users;

        const chats = body.chats;

        console.log(chats);

        const list = new ChatList('chat-list');
        list.render(chats);
        const window = new ChatWindow('chat-window');
        window.render();

        const listView = document.querySelector('#chat-list');
        const chatWindowView = document.querySelector('#chat-window');

        for (const chat of chats) {
            const chatElem = document.querySelector(`#chat-${chat.user.user_id}`);
            chatElem.addEventListener('click', async (event) => {
                event.preventDefault();
                if (this.currentChat) {
                    this.currentChat['inputValue'] = document.querySelector('#chat-input').value;
                }
                if (!this.currentChat || this.currentChat.user_id !== chat.user.user_id) {
                    await window.render(chat.user);
                    this.currentChat = chat.user;
                }
                listView.classList.replace('window-on-top', 'window-on-bottom');
                chatWindowView.classList.replace('window-on-bottom', 'window-on-top');
            });
        }
    }
}
