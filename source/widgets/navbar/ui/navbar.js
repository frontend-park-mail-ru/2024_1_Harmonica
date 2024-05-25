import {View} from '../../../app/View.js';
import templateNavbar from './navbar.handlebars';
import './navbar.scss';
import {Logout} from '../../../features/logout/model/logout.js';
import {FeedView} from '../../../pages/feed/ui/FeedView.js';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';

export class NavbarView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#navbar');
        this.eventListeners = [];
    }

    render() {
        let user;
        try {
            user = localStorageGetValue('user');
        } catch (error) {
            Error();
        }

        this.root.innerHTML = templateNavbar({user});

        const logo = this.root.querySelector('#navbar_logo');
        logo.addEventListener('click', (event) => {
            event.preventDefault();
            history.pushState(null, null, '/');
        });

        const searchInput = this.root.querySelector('#search-input');
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (searchInput.value.replace(/(\s|\t)*/, '')) {
                    history.pushState(null, null, `/search/${searchInput.value}`);
                }
            }
        });

        const searchButton = this.root.querySelector('#search__button');
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (searchInput.value.replace(/(\s|\t)*/, '')) {
                history.pushState(null, null, `/search/${searchInput.value}`);
            }
        });

        if (user) {
            const arrowSign = this.root.querySelector('#navbar-popup__icon');
            const popupMenu = this.root.querySelector('#navbar-popup-menu');
            const navbarPopup = this.root.querySelector('#navbar-popup-button');

            navbarPopup.addEventListener('click', (event) => {
                event.preventDefault();
                if (arrowSign.classList.contains('navbar-popup__icon_closed')){
                    arrowSign.classList.remove('navbar-popup__icon_closed');
                    popupMenu.classList.remove('navbar-popup-menu_closed');
                    return;
                }
                arrowSign.classList.add('navbar-popup__icon_closed');
                popupMenu.classList.add('navbar-popup-menu_closed');
            });

            const userAvatar = new Avatar('navbar-popup-button__avatar', navbarPopup);
            userAvatar.render(user.avatar_url);

            const chatButton = this.root.querySelector('#navbar__chat-button');
            chatButton.addEventListener('click', (event) => {
                event.preventDefault();
                history.pushState(null, null, '/chat');
            });

            const profileButton = this.root.querySelector('#navbar-popup-menu__profile');
            profileButton.addEventListener('click', async () => {
                const user = JSON.parse(localStorage.getItem('user'));
                history.pushState(null, null, '/profile/' + user.nickname);
            });

            const logoutButton = this.root.querySelector('#navbar-popup-menu__exit');
            logoutButton.addEventListener('click', async () => {
                await Logout('/');
                const feed = new FeedView();
                feed.render();
            });

            const popupFeed = this.root.querySelector('#navbar-popup-menu__feed');
            popupFeed.addEventListener('click', (event) => {
                event.preventDefault();
                history.pushState(null, null, '/');
            });
        } else {
            const loginButton = this.root.querySelector('#navbar_login_button');
            const signupButton = this.root.querySelector('#navbar_signup_button');
            loginButton.addEventListener('click', () => {
                history.pushState(null, null, '/login');
            });
            signupButton.addEventListener('click', () => {
                history.pushState(null, null, '/signup');
            });
        }

        addEventListener('pageMovement', (event) => {
            event.preventDefault();
            searchInput.value = '';
            if (user){
                const arrowSign = this.root.querySelector('#navbar-popup__icon');
                const popupMenu = this.root.querySelector('#navbar-popup-menu');

                arrowSign.classList.add('navbar-popup__icon_closed');
                popupMenu.classList.add('navbar-popup-menu_closed');
            }
        });
    }
}
