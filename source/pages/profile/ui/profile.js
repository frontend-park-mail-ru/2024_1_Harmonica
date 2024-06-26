import templateProfile from './profile.handlebars';
import './profile.scss';
import {ProfileUserInfo} from '../../../widgets/profileUserInfo/ui/profileUserInfo.js';
import {ProfileFeed} from '../../../widgets/profileFeed/ui/profileFeed.js';
import {View} from '../../../app/View.js';
import {ProfileAPI} from '../api/api.js';
import {ProfileEdit} from '../../profileEdit/ui/profileEdit.js';
import {PinView} from '../../pin/ui/pinView.js';
import {BoardEdit} from '../../boardEdit/ui/boardEdit.js';
import {Error} from '../../error/ui/error.js';
import {ModalListWindowView} from '../../../widgets/modalWindow/ui/modalWindow.js';
import {API} from '../../../shared/api/API.js';
import {UserListItemView} from '../../../entity/userListItem/ui/userListItem.js';
import {ListBlockView} from '../../../features/listBlock/ui/listBlock.js';

/**
 * Handle profile page
 */
export class Profile extends View {
    /**
     * Define some properties for profile page
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
        this.popMenuOpen = false;
    }

    /**
     * Render profile page
     * @function render
     * @param {Array} nickname – User's nickname
     */
    async render(nickname) {
        const profileAPI = new ProfileAPI(nickname);
        const response = await profileAPI.api();
        if (response.code !== 0) {
            const errorView = new Error();
            await errorView.render();
            return;
        }
        const user = response.body;
        this.root.innerHTML = templateProfile({user});
        this.profileUserInfo = new ProfileUserInfo();
        const profileFeed = new ProfileFeed();
        this.profileUserInfo.render(user);
        await profileFeed.renderFeed(user);

        const modal = new ModalListWindowView();

        const followers = document.querySelector('#profile-followers');
        followers.addEventListener('click', async () => {
            const api = new API(`/users/subscribers/${user.user.user_id}`);
            const response = await api.get();
            if (response.code) {
                return;
            }
            const subscribers = response.body.subscribers;
            if (!subscribers) {
                return;
            }
            modal.render(ListBlockView, subscribers, UserListItemView);
        });

        const subs = document.querySelector('#profile-subscriptions');
        subs.addEventListener('click', async () => {
            const api = new API(`/users/subscriptions/${user.user.user_id}`);
            const response = await api.get();
            if (response.code) {
                return;
            }
            const subscriptions = response.body.subscriptions;
            if (!subscriptions) {
                return;
            }
            modal.render(ListBlockView, subscriptions, UserListItemView);
        });

        if (user.is_owner) {
            const buttonLikes = document.querySelector('#profile-like-button');
            buttonLikes.addEventListener('click', async (event) => {
                event.preventDefault();
                history.pushState(null, null, '/board/0');
            });

            const pinAdd = document.querySelector('#profile-pin-add');
            pinAdd.addEventListener('click', (event) => {
                event.preventDefault();
                const pinCreate = new PinView();
                pinCreate.renderPinCreate();
            });

            const boardAdd = document.querySelector('#profile-board-add');
            boardAdd.addEventListener('click', (event) => {
                event.preventDefault();
                const boardCreate = new BoardEdit();
                boardCreate.renderCreateBoard();
            });

            const profileEditElem = document.querySelector('#profile-edit');
            profileEditElem.addEventListener('click', (event) => {
                event.preventDefault();
                const profileEdit = new ProfileEdit();
                profileEdit.render(user);
            });

            const popMenu = document.querySelector('#profile-pop-menu');
            const popMenuButton = document.querySelector('#profile-pop-menu__button');
            popMenuButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.popMenuOpen = !this.popMenuOpen;
                if (this.popMenuOpen) {
                    popMenu.classList.remove('profile-pop-menu__closed');
                    popMenuButton.classList.remove('button-add__closed');
                } else {
                    popMenu.classList.add('profile-pop-menu__closed');
                    popMenuButton.classList.add('button-add__closed');
                }
            });
        }

        const boardButton = document.querySelector('#profile-content-boards');
        boardButton.addEventListener('click', (event) =>{
            event.preventDefault();
            profileFeed.renderBoards(user);
        });

        const feedButton = document.querySelector('#profile-content-pins');
        feedButton.addEventListener('click', (event) => {
            event.preventDefault();
            profileFeed.renderFeed(user);
        });
    };
}
