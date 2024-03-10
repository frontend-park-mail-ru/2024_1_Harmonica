import {Navbar} from './components/widget/navbar/navbar.js';
import {Feed} from './components/pages/feed/feed.js';
import {API} from './modules/API.js';

const api = new API();
const response = await api.isAuth();
if (response.code !== 0){
    localStorage.removeItem("user");
}
Navbar();
Feed();
