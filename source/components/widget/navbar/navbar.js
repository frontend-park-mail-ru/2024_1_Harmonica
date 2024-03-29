/** @module source/components/widget/navbar */

import {Feed} from '../../pages/feed/feed.js';
import {Login, Logout} from '../../pages/login/login.js';
import {Signup} from '../../pages/signup/signup.js';

/**
 * Provides navbar view on site by rendering 'Handlebars.templates.navbar'
 * @function Navbar
 */
export const Navbar = () => {
    const template = Handlebars.templates.navbar;
    const root = document.getElementById('navbar');

    const userInfo = {'user': JSON.parse(localStorage.getItem('user'))};
    root.innerHTML = template(userInfo);

    const logoButton = root.querySelector('#navbar_logo');
    logoButton.addEventListener('click', () => {
        Feed();
    });

    if (userInfo.user) {
        const logoutButton = root.querySelector('#navbar_logout_button');
        logoutButton.addEventListener('click', () => {
            Logout();
        });
    } else {
        const loginButton = root.querySelector('#navbar_login_button');
        const signupButton = root.querySelector('#navbar_signup_button');
        loginButton.addEventListener('click', () => {
            Login();
        });
        signupButton.addEventListener('click', () => {
            Signup();
        });
    }
};
