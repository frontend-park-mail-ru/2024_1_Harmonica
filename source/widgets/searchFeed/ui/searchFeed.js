import {View} from '../../../app/View.js';
import searchFeedTemplate from './searchFeed.handlebars';
import './searchFeed.scss';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';
import {FeedBoardsView} from '../../../entity/profileFeedBoards/ui/profileFeedBoards.js';

export class SearchFeedView extends View {
    constructor(contentID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${contentID}`);
    }

    async renderPins(pins) {
        this.root.innerHTML = searchFeedTemplate({items: pins, isFeed: true});

        const feed = new FeedBlockView('search-feed-content');
        feed.render(pins, PinFeedView);
    }

    async renderBoards(boards) {
        this.root.innerHTML = searchFeedTemplate({items: boards, isFeed: true});

        const feed = new FeedBlockView('search-feed-content');
        feed.render(boards, FeedBoardsView, 'board_id');
    }

    async renderUsers(users) {
        this.root.innerHTML = searchFeedTemplate({items: users, isFeed: false});

        // const list = new
    }
}
