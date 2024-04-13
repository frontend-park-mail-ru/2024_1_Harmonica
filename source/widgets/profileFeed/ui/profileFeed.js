import profileFeedTemplate from './profileFeed.handlebars';
import './profile-feed.css';
import {View} from '../../../app/View.js';
import {profileFeedAPI} from '../api/api.js';
import {Pins} from '../../../components/widget/pins/pins.js';
import {ProfileFeedBoardsView} from '../../profileFeedBoards/ui/profileFeedBoards.js';

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

        if (pins) {
            Pins(pins, 'profile_feed');
        }
    }

    async renderBoards(user){
        const feedAPI = new profileFeedAPI(user.nickname, 'boards');
        const response = await feedAPI.api();
        let boards = response.body.boards;

        this.feed.innerHTML = profileFeedTemplate({pins: boards});

        if (boards) {
            const profileFeedBoards = new ProfileFeedBoardsView();
            profileFeedBoards.render(boards);
        }
    }
}
