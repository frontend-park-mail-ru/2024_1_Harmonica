import {View} from '../../../app/View.js';
import userListTemplate from './userListItem.handlebars';
import './userListItem.scss';

export class UserListItemView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    onClick(userNickname) {
        history.pushState(null, null, '/profile/' + userNickname);
    }

    render(user) {
        this.root.innerHTML = userListTemplate({user});
        const eventRoot = document.querySelector('#user-' + user.user_id);
        eventRoot.addEventListener('click', (event) => {
            event.preventDefault();
            this.onClick(user.nickname);
        });
    }
}
