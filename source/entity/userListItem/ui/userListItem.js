import {View} from '../../../app/View.js';
import userListTemplate from './userListItem.handlebars';
import './userListItem.scss';
import {Avatar} from '../../avatar/ui/avatar.js';

export class UserListItemView extends View {
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    onClick(userNickname) {
        history.pushState(null, null, '/profile/' + userNickname);
    }

    render(user, eventFunc = null) {
        this.root.innerHTML = userListTemplate({user});
        const eventRoot = document.querySelector('#user-' + user.nickname);
        if (!eventFunc) {
            eventFunc = (event) => {
                event.preventDefault();
                this.onClick(user.nickname);
            };
        }
        eventRoot.addEventListener('click', eventFunc);

        const avatar = new Avatar('list-item-avatar', this.root);
        avatar.render(user.avatar_url);
    }
}
