import profileFeedTemplate from './profileFeed.handlebars';
import './profile-feed.scss';
import {View} from '../../../app/View.js';
import {FeedBoardsView} from '../../../entity/profileFeedBoards/ui/profileFeedBoards.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';
import {API} from '../../../shared/api/API.js';

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

        const feed = new FeedBlockView('profile_feed');
        feed.render(pins, PinFeedView);
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

        const feed = new FeedBlockView('profile_feed');
        feed.render(boards, FeedBoardsView, 'board_id');
    }
}
