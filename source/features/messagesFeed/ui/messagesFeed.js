import {View} from '../../../app/View.js';
import messagesFeedTemplate from './messagesFeed.handlebars';
import './messagesFeed.scss';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';

export class MessagesFeedView extends View{
    constructor(elemID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${elemID}`);
    }

    render(messages) {
        const user = localStorageGetValue('user');
        for (let message of messages){
            console.log(message, user);
            message.isOwner = message.sender_id === user.user_id;
        }
        console.log(messages);
        this.root.innerHTML = messagesFeedTemplate({messages});
    }
}
