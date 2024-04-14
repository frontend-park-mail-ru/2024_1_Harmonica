import {View} from '../../../app/View.js';
import templateNavbar from './navbar.handlebars';
import './navbar.scss';
import {Profile} from '../../../pages/profile/ui/profile.js';
import {LoginView} from '../../../pages/login/ui/loginView.js';
import {Logout} from '../../../features/logout/model/logout.js';
import {SignupView} from '../../../pages/signup/ui/signupView.js';

export class NavbarView extends View{
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

        if (userInfo.user) {
            const profileButton = this.root.querySelector('#navbar-user-name');
            profileButton.addEventListener('click', async () => {
                const user = JSON.parse(localStorage.getItem('user'));
                window.location.pathname = '/profile/' + user.nickname;
            })
            const logoutButton = this.root.querySelector('#navbar_logout_button');
            logoutButton.addEventListener('click', async () => {
                await Logout('/');
            });
        } else {
            const loginButton = this.root.querySelector('#navbar_login_button');
            const signupButton = this.root.querySelector('#navbar_signup_button');
            loginButton.addEventListener('click', () => {
                window.location.pathname = '/login';
            });
            signupButton.addEventListener('click', () => {
                window.location.pathname = '/signup';
            });
        }
    }
}
