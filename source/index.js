import {Navbar} from './components/widget/navbar/navbar.js';
import {Feed} from './components/pages/feed/feed.js';
import {API} from './modules/API.js';
import {Error} from './components/pages/error/error.js';
import './index.css';

const api = new API();
const response = await api.isAuth();
if (response.code !== 0) {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        Error();
    }
} else {
    try {
        localStorage.setItem('user', JSON.stringify(response.body));
    } catch (error) {
        Error();
    }
}
Navbar();
Feed();
