import commentView from './comment.handlebars';
import './comment.scss';
import {View} from '../../../app/View.js';
import {Avatar} from '../../avatar/ui/avatar.js';

export class CommentView extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    render(comment, addNew = false) {
        const commentElem = document.createElement('div');
        commentElem.classList.add('comment-block');
        commentElem.innerHTML = commentView({comment});

        const avatar = new Avatar('comment-avatar', commentElem);
        avatar.render(comment.user.avatar_url);

        const pos = addNew ? 'afterbegin' : 'beforeend';
        this.root.insertAdjacentElement(pos, commentElem);

        const func = (event) => {
            event.preventDefault();
            history.pushState(null, null, '/profile/' + comment.user.nickname);
        }
        const nickname = commentElem.querySelector('#comment-nickname');
        nickname.addEventListener('click', func);
        avatar.root.addEventListener('click', func);
    }
}
