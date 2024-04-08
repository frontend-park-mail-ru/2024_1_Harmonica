import {Navbar} from '../components/widget/navbar/navbar.js';
// import {Feed} from '../components/pages/feed/feed.js';
import {API} from '../shared/api/API.js';
import {Error} from '../components/pages/error/error.js';
import './App.css';
// import {BoardView} from '../pages/boardView/ui/boardView.js';
import {BoardEdit} from '../pages/boardEdit/ui/boardEdit.js';
// import {Profile} from '../pages/profile/ui/profile.js';
// import {ProfileEdit} from '../pages/profileEdit/ui/profileEdit.js';
// import {PinView} from '../pages/pinView/ui/pinView.js';


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
/* const profileEdit = new ProfileEdit();
profileEdit.render(profileEdit.user); */
// const pinWatch = new PinView();
// pinWatch.renderPin(pinWatch.pin);
// pinWatch.renderPinUpdate(pinWatch.pin);
// pinWatch.renderPinCreate();
/* const boardView = new BoardView();
boardView.render(boardView.board); */
/* const boardEdit = new BoardEdit();
boardEdit.renderUpdateBoard(boardEdit.board); */
const boardCreate = new BoardEdit();
boardCreate.renderCreateBoard();
// Feed();

