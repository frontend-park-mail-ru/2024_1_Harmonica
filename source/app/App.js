import {Navbar} from '../components/widget/navbar/navbar.js';
// import {Feed} from '../components/pages/feed/feed.js';
import {API} from '../shared/api/API.js';
import {Error} from '../components/pages/error/error.js';
import './App.css';
// import {Profile} from '../pages/profile/ui/profile.js';
import {ProfileEdit} from '../pages/profileEdit/ui/profileEdit.js';


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
/* const profile = new Profile();
profile.render(profile.user); */
const profileEdit = new ProfileEdit();
profileEdit.render(profileEdit.user);
// Feed();
