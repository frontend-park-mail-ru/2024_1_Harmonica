import {View} from '../../../app/View.js';
import messagesFeedTemplate from './messagesFeed.handlebars';
import './messagesFeed.scss';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';

export class MessagesFeedView extends View {
    constructor(elemID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${elemID}`);
    }

    addMessage(message, otherUserID) {
        message.isOwner = message.receiver_id === otherUserID;
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
