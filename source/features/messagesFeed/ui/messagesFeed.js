import {View} from '../../../app/View.js';
import messagesFeedTemplate from './messagesFeed.handlebars';
import './messagesFeed.scss';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';
import {API} from '../../../shared/api/API.js';

export class MessagesFeedView extends View {
    constructor(elemID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${elemID}`);
    }

    async renderMessage(message) {
        message.isOwner = false;
        this.root.insertAdjacentHTML('afterbegin', messagesFeedTemplate({messages: [message]}));
    }

    async addMessage(message, receiverID) {
        const api = new API(`/messages/${receiverID}`);
        const response = await api.post(JSON.stringify(message));
        message.isOwner = true;
        this.root.insertAdjacentHTML('afterbegin', messagesFeedTemplate({messages: [message]}));
    }

    render(messages) {
        if (messages && !messages.isEmpty) {
            const user = localStorageGetValue('user');
            for (const message of messages) {
                message.isOwner = message.sender_id === user.user_id;
            }
            this.root.innerHTML = messagesFeedTemplate({messages});
        }
    }
}
