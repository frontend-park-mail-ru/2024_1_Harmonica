import {View} from '../../../app/View.js';
import chatTemplate from './chat.handlebars';
import './chat.scss';
import {ChatList} from '../../../widgets/chatList/index.js';
import {ChatWindow} from '../../../widgets/chatWindow/index.js';
import {API} from '../../../shared/api/API.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {ModalListWindowView} from '../../../widgets/modalWindow/ui/modalWindow.js';
import {ListBlockView} from '../../../features/listBlock/ui/listBlock.js';
import {UserListItemView} from '../../../entity/userListItem/ui/userListItem.js';

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

        if (chats){
            const list = new ChatList('chat-list');
            list.render(chats);
        }
        const window = new ChatWindow('chat-window');
        window.render();


        if (chats) {
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
                        await window.render(chat);
                        this.currentChat = chat.user;
                    }
                    listView.classList.replace('window-on-top', 'window-on-bottom');
                    chatWindowView.classList.replace('window-on-bottom', 'window-on-top');
                });
            }
        }

        const chatAdd = this.root.querySelector('#chat-list-add-button');
        chatAdd.addEventListener('click', async (event) => {
            event.preventDefault();
            const api = new API('/search/\o');
            const response = await api.get();
            if (!response?.body?.users){
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors['oops']);
                return;
            }
            const modalWindow = new ModalListWindowView();
            const eventFunc = async (event) => {
                event.preventDefault();
                modalWindow.close();
                const targetID = event.currentTarget.getAttribute("id");
                console.log(targetID, targetID.slice(5));

                const userAPI = new API('/users/' + targetID.slice(5));
                const userResponse = await userAPI.get();
                const user = userResponse.body.user;

                const chatWindow = new ChatWindow('chat-window');
                chatWindow.render({user});
            }
            modalWindow.render(ListBlockView, response.body.users, UserListItemView, eventFunc);
        });
    }
}
