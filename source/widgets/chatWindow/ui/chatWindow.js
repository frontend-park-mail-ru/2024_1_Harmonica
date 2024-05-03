import {View} from '../../../app/View.js';
import chatWindowTemplate from './chatWindow.handlebars';
import './chatWindow.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';

export class ChatWindow extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    render(user = {}) {
        this.root.innerHTML = chatWindowTemplate({user});

        if (user()) {
            const avatar = new Avatar('chat__selected-avatar');
            avatar.render(user.avatar_url);
        }
    }
}
