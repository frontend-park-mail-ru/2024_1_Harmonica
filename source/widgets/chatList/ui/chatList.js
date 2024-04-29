import {View} from '../../../app/View.js';
import chatListTemplate from './chatList.handlebars';
import './chatList.scss';

export class ChatList extends View{
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }
    render() {
        this.root.innerHTML = chatListTemplate({});
    }
}
