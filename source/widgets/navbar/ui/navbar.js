import {View} from '../../../app/View.js';
import templateNavbar from './navbar.handlebars';
import './navbar.css';
import {Profile} from '../../../pages/profile/ui/profile.js';
import {Logout} from '../../../components/pages/login/login.js';
import {Signup} from '../../../components/pages/signup/signup.js';
import {LoginView} from '../../../pages/loginView/ui/loginView.js';

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
        console.log(userInfo);
        this.root.innerHTML = templateNavbar({user: userInfo.user});

        if (userInfo.user) {
            const profileButton = this.root.querySelector('#navbar-user-name');
            profileButton.addEventListener('click', async () => {
                const profile = new Profile();
                const user = JSON.parse(localStorage.getItem('user'));
                await profile.render(user.nickname);
            })
            const logoutButton = this.root.querySelector('#navbar_logout_button');
            logoutButton.addEventListener('click', () => {
                Logout();
            });
        } else {
            const loginButton = this.root.querySelector('#navbar_login_button');
            const signupButton = this.root.querySelector('#navbar_signup_button');
            loginButton.addEventListener('click', () => {
                const login = new LoginView();
                login.render();
            });
            signupButton.addEventListener('click', () => {
                Signup();
            });
        }
    }
}
