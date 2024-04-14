import profileFeedTemplate from './profileFeed.handlebars';
import './profile-feed.css';
import {View} from '../../../app/View.js';
import {profileFeedAPI} from '../api/api.js';
import {ProfileFeedBoardsView} from '../../profileFeedBoards/ui/profileFeedBoards.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';

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
        const feedAPI = new profileFeedAPI(user.nickname, 'pins');
        const response = await feedAPI.api();
        let pins = response.body.pins;

        this.feed.innerHTML = profileFeedTemplate({pins});

        const feed = new FeedBlockView('profile_feed');
        feed.render(pins, PinFeedView);
    }

    async renderBoards(user){
        const feedAPI = new profileFeedAPI(user.nickname, 'boards');
        const response = await feedAPI.api();
        let boards = response.body.boards;

        this.feed.innerHTML = profileFeedTemplate({pins: boards});

        const feed = new FeedBlockView('profile_feed');
        feed.render(boards, ProfileFeedBoardsView, 'board_id');
    }
}
