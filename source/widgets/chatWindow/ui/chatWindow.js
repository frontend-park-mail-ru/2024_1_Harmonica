import {View} from '../../../app/View.js';
import chatWindowTemplate from './chatWindow.handlebars';
import './chatWindow.scss';

export class ChatWindow extends View{
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`)
    }

    render() {
        this.root.innerHTML = chatWindowTemplate({});
    }
}
