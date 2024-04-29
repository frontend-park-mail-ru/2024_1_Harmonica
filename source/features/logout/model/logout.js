import {LogoutAPI} from '../api/api.js';
import {NavbarView} from '../../../widgets/navbar/ui/navbar.js';

/**
 * Logout button handler: logouts user and refresh navbar
 * @function Logout
 * @async
 * @param {string} reqURL - request URL
 */
export const Logout = async (reqURL) => {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        Error();
    }
    const api = new LogoutAPI();
    const response = await api.logoutRequest();
    if (response.code !== 0) {
        Error();
        return;
    }
    const navbar = new NavbarView();
    navbar.render();
    window.location.pathname = reqURL;
};
