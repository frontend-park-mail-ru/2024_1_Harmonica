import {View} from '../../../app/View.js';
import chatTemplate from './chat.handlebars';
import './chat.scss';
import {ChatList} from '../../../widgets/chatList/index.js';
import {ChatWindow} from '../../../widgets/chatWindow/index.js';

export class ChatView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    render() {
        this.root.innerHTML = chatTemplate({});
        const list = new ChatList('chat-list');
        list.render();
        const window = new ChatWindow('chat-window');
        window.render();
    }
}
