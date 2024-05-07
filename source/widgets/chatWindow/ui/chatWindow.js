import {View} from '../../../app/View.js';
import chatWindowTemplate from './chatWindow.handlebars';
import './chatWindow.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {API} from '../../../shared/api/API.js';
import {MessagesFeedView} from '../../../features/messagesFeed/ui/messagesFeed.js';
import WebSocketService from '../../../shared/api/WebSocket.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';

export class ChatWindow extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    async render(user = {}) {
        let messages = null;
        if (user && user.user_id) {
            const api = new API(`/messages/${user.user_id}`);
            const response = await api.get();
            messages = response.body.messages;
        }
        this.root.innerHTML = chatWindowTemplate({user});

        const messageView = new MessagesFeedView('chat-messages');

        const backButton = document.querySelector('#chat-back-button');
        backButton.addEventListener('click', (event) => {
            event.preventDefault();
            const listView = document.querySelector('#chat-list');
            const chatWindowView = document.querySelector('#chat-window');

            chatWindowView.classList.replace('window-on-top', 'window-on-bottom');
            listView.classList.replace('window-on-bottom', 'window-on-top');
        });

        if (user && user.user_id) {
            const avatar = new Avatar('chat__selected-avatar');
            avatar.render(user.avatar_url);

            messageView.render(messages);

            const messageInput = document.querySelector('#chat-input');

            const messageSend = async () => {
                if (messageInput.value.replace(/(\s|\t)*/, '')) {
                    const message = {
                        text: messageInput.value,
                    };

                    const api = new API(`/messages/${user.user_id}`);
                    const response = await api.post(JSON.stringify(message));

                    if (response.code) {
                        const errorWindow = new ErrorWindowView();
                        errorWindow.render('Возникла ошибка при отрпавке сообщения! ' +
                            'Повторите позже.');
                        return;
                    }

                    const payload = {
                        ...message,
                        receiver_id: user.user_id,
                    };

                    WebSocketService.send('CHAT_MESSAGE', payload);
                    messageInput.value = '';
                }
            };

            messageInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    messageSend();
                }
            });

            const enterButton = document.querySelector('#chat__enter-button');
            enterButton.addEventListener('click', (event) => {
                event.preventDefault();
                messageSend();
            });
        }

        WebSocketService.register('CHAT_MESSAGE', (payload) => {
            if (user.user_id === payload.receiver_id || user.user_id === payload.sender_id) {
                const messageView = new MessagesFeedView('chat-messages');
                messageView.addMessage(payload, user.user_id);
            }
        });
    }
}
