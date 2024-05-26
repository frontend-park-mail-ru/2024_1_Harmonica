import {View} from '../../../app/View.js';
import messagesFeedTemplate from './messagesFeed.handlebars';
import './messagesFeed.scss';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';
import {parseMessageOnLink} from '../../../shared/utils/parseLink.js';
import {API} from '../../../shared/api/API.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';

export class MessagesFeedView extends View {
    constructor(elemID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${elemID}`);
        this.id = 0;
    }

    async addMessage(message, otherUserID) {
        message.isOwner = message.receiver_id === otherUserID;
        this.id++;
        message.id = this.id;

        const parsedMessage = parseMessageOnLink(message.text);
        message.text = parsedMessage.value;
        if (parsedMessage.pin_id) {
            const api = new API('/pins/' + parsedMessage.pin_id);
            const response = await api.get();

            message.pin = response.body;
        }

        this.root.insertAdjacentHTML('afterbegin', messagesFeedTemplate({messages: [message]}));

        if (message?.pin) {
            const pinView = document.querySelector(`#message-${message.id}
                                        -pin-${message.pin.pin_id}`);

            const pinContent = new PinFeedView(pinView);
            pinContent.render(message.pin);
        }
    }

    async render(messages) {
        if (!messages?.isEmpty) {
            const user = localStorageGetValue('user');
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                message.id = i;
                this.id = i;
                message.isOwner = message.sender_id === user.user_id;

                const parsedMessage = parseMessageOnLink(message.text);
                message.text = parsedMessage.value;
                if (parsedMessage.pin_id) {
                    const api = new API('/pins/' + parsedMessage.pin_id);
                    const response = await api.get();

                    message.pin = response.body;
                }
            }
            this.root.innerHTML = messagesFeedTemplate({messages});
            for (const message of messages) {
                if (message?.pin) {
                    const pinView = document.querySelector(`#message-${message.id}
                                                -pin-${message.pin.pin_id}`);

                    const pinContent = new PinFeedView(pinView);
                    pinContent.render(message.pin);
                }
            }
        }
    }
}
