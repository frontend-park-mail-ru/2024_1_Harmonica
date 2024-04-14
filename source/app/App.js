import {API} from '../shared/api/API.js';
import {Error} from '../components/pages/error/error.js';
import './styles/App.css';
import {Router} from './Router.js';
// import {BoardView} from '../pages/boardView/ui/boardView.js';
// import {BoardEdit} from '../pages/boardEdit/ui/boardEdit.js';
import {Profile} from '../pages/profile/ui/profile.js';
import {PinView} from '../pages/pinView/ui/pinView.js';
import {BoardView} from '../pages/boardView/ui/boardView.js';
import {FeedView} from '../pages/FeedView/ui/FeedView.js';
import {NavbarView} from '../widgets/navbar/ui/navbar.js';
// import {ProfileEdit} from '../pages/profileEdit/ui/profileEdit.js';
// import {PinView} from '../pages/pinView/ui/pinView.js';


const router = new Router();
router.register('/', new FeedView());
router.register('/profile/{nickname}', new Profile());
// router.register('/login', );
// router.register('/signup', );
router.register('/pin/{pin_id}', new PinView());
router.register('/board/{board_id}', new BoardView());
// router.register('/pin/create', );
// router.register('/board/create', );

const api = new API('');
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
const navbar = new NavbarView();
navbar.render();
router.start();
