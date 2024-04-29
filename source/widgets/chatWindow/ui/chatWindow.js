import {View} from '../../../app/View.js';
import chatWindowTemplate from './chatWindow.handlebars';
import './chatWindow.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';

export class ChatWindow extends View{
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`)
    }

    render() {
        const user = {
            user_id: 1,
            user_nickname: 'New user',
        }
        this.root.innerHTML = chatWindowTemplate({user});

        const avatar = new Avatar('chat__selected-avatar');
        avatar.render();
    }
}
