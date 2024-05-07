import profileFeedTemplate from './profileFeed.handlebars';
import './profile-feed.scss';
import {View} from '../../../app/View.js';
import {FeedBoardsView} from '../../../entity/profileFeedBoards/ui/profileFeedBoards.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';
import {API} from '../../../shared/api/API.js';
import {ButtonView} from '../../../entity/button/ui/button.js';
import {PinView} from '../../../pages/pin/ui/pinView.js';
import {BoardEdit} from '../../../pages/boardEdit/ui/boardEdit.js';

/**
 * Class for handle profile feed
 */
export class ProfileFeed extends View {
    /**
     * Define variables for profileFeed
     * @constructor
     * @param {Array} args – Variables to pass into parent constructor
     */
    constructor(...args) {
        super(...args);
        this.feed = document.getElementById('content');
    }

    /**
     * Render profile feed widget
     * @function renderFeed
     * @param {Array} user – user info
     */
    async renderFeed(user) {
        const feedAPI = new API('/pins/created/' + user.nickname);
        const response = await feedAPI.get();
        const pins = response.body.pins;

        this.feed.innerHTML = profileFeedTemplate({pins});

        if (pins) {
            const feed = new FeedBlockView('profile_feed');
            await feed.render(pins, PinFeedView);
            return;
        }
        const newPinButton = new ButtonView('message__button');
        newPinButton.render('Создайте первый пин!', ['primary-button'], 'new-pin-button');

        newPinButton.root.addEventListener('click', (event) => {
            event.preventDefault();
            const newPin = new PinView();
            newPin.renderPinCreate();
        });
    }

    /**
     * Function to render boards feed
     * @param {json} user – info about user
     * @return {Promise<void>}
     */
    async renderBoards(user) {
        const feedAPI = new API('/boards/created/' + user.nickname);
        const response = await feedAPI.get();
        const boards = response.body.boards;

        this.feed.innerHTML = profileFeedTemplate({pins: boards});

        if (boards) {
            const feed = new FeedBlockView('profile_feed');
            await feed.render(boards, FeedBoardsView);
            return;
        }

        const newBoardButton = new ButtonView('message__button');
        newBoardButton.render('Создайте первую доску!', ['primary-button'], 'new-board-button');

        newBoardButton.root.addEventListener('click', (event) => {
            event.preventDefault();
            const newBoard = new BoardEdit();
            newBoard.renderCreateBoard();
        });
    }
}
