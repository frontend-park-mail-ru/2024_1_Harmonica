import {API} from '../shared/api/API.js';
import {Error} from '../pages/error/ui/error.js';
import '../shared/styles/App.scss';
import {Router} from './Router.js';
import {Profile} from '../pages/profile/ui/profile.js';
import {PinView} from '../pages/pin/ui/pinView.js';
import {BoardView} from '../pages/board/ui/boardView.js';
import {FeedView} from '../pages/feed/ui/FeedView.js';
import {NavbarView} from '../widgets/navbar/ui/navbar.js';
import {LoginView} from '../pages/login/ui/loginView.js';
import {SignupView} from '../pages/signup/ui/signupView.js';
import WebSocketService from '../shared/api/WebSocket.js';
import {ChatView} from '../pages/chat/index.js';
import {SearchFeedView} from '../pages/searchFeed/index.js';


/**
 * Class provides class App, the initial class
 */
export class App {
    /**
     * Function that started the app
     * @return {Promise<void>}
     */
    async start() {
        const router = new Router();
        router.register('/', new FeedView());
        router.register('/profile/{nickname}', new Profile());
        router.register('/login', new LoginView());
        router.register('/signup', new SignupView());
        router.register('/pin/{pin_id}', new PinView());
        router.register('/board/{board_id}', new BoardView());

        const api = new API('');
        const response = await api.isAuth();
        if (response.code) {
            try {
                localStorage.removeItem('user');
            } catch (error) {
                Error();
            }
        } else {
            try {
                localStorage.setItem('user', JSON.stringify(response.body));
                console.log(WebSocketService, typeof WebSocketService);
                WebSocketService.initialize();
            } catch (error) {
                Error();
            }
        }
        const navbar = new NavbarView();
        navbar.render();
        // router.start();
        // const chat = new ChatView();
        // chat.render();
        const search = new SearchFeedView();
        search.render();
    }
}
