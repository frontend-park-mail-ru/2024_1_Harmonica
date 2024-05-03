import {View} from '../../../app/View.js';
import templateNavbar from './navbar.handlebars';
import './navbar.scss';
import {Logout} from '../../../features/logout/model/logout.js';

export class NavbarView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#navbar');
        this.eventListeners = [];
    }

    render() {
        let user;
        try {
            user = localStorage.getItem('user');
        } catch (error) {
            Error();
        }
        const userInfo = {'user': JSON.parse(user)};
        this.root.innerHTML = templateNavbar({user: userInfo.user});

        const logo = this.root.querySelector('#navbar_logo');
        logo.addEventListener('click', (event) => {
            event.preventDefault();
            history.pushState(null, null, '/');
        });

        const searchInput = this.root.querySelector('#search-input');
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                history.pushState(null, null, `/search/${searchInput.value}`);
            }
        });

        const searchButton = this.root.querySelector('#search__button');
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            history.pushState(null, null, `/search/${searchInput.value}`);
        });

        if (userInfo.user) {
            const profileButton = this.root.querySelector('#navbar-user-name');
            profileButton.addEventListener('click', async () => {
                const user = JSON.parse(localStorage.getItem('user'));
                history.pushState(null, null, '/profile/' + user.nickname);
            });
            const logoutButton = this.root.querySelector('#navbar_logout_button');
            logoutButton.addEventListener('click', async () => {
                await Logout('/');
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
    }
}
