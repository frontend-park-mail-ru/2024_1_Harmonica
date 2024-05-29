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
import {errors} from '../../../shared/config.js';

export class ChatView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
        this.currentChat = null;
    }

    async render() {
        this.root.innerHTML = chatTemplate({});

        const list = new ChatList('chat-list');
        list.render();

        const window = new ChatWindow('chat-window');
        window.render();

        const chatAdd = this.root.querySelector('#chat-list-add-button');
        chatAdd.addEventListener('click', async (event) => {
            event.preventDefault();
            const api = new API('/all/users');
            const response = await api.get();
            if (!response?.body) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors['oops']);
                return;
            }
            const modalWindow = new ModalListWindowView();
            const eventFunc = async (event) => {
                event.preventDefault();
                modalWindow.close();
                const targetID = event.currentTarget.getAttribute('id');

                const userAPI = new API('/users/' + targetID.slice(5));
                const userResponse = await userAPI.get();
                const user = userResponse.body.user;

                const chatWindow = new ChatWindow('chat-window');
                chatWindow.render({user});
            };
            modalWindow.render(ListBlockView, response.body.users, UserListItemView, eventFunc);
        });
    }
}
