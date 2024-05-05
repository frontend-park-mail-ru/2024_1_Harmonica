import {View} from '../../../app/View.js';
import feedViewTemplate from './FeedView.handlebars';
import './FeedView.scss';
import {API} from '../../../shared/api/API.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';
import {NavbarView} from '../../../widgets/navbar/ui/navbar.js';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';

export class FeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async renderHomeFeed() {
        const api = new API('/pins');
        const response = await api.get();

        const pins = response.body.pins;
        const feedBlock = new FeedBlockView('feed');
        feedBlock.render(pins, PinFeedView);
    }

    async renderSubsFeed() {
        const api = new API('/pins?subscriptions=true');
        const response = await api.get();

        const pins = response.body.pins;
        const feedBlock = new FeedBlockView('feed');
        feedBlock.render(pins, PinFeedView);
    }

    async render() {
        const navbar = new NavbarView();
        navbar.render();

        const user = localStorageGetValue('user');
        this.root.innerHTML = feedViewTemplate({user});

        await this.renderHomeFeed()

        const homeButton = document.querySelector('#feed-home-button');
        const subsButton = document.querySelector('#feed-subs-button');

        homeButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.renderHomeFeed();
            homeButton.classList.replace('secondary-button', 'primary-button');
            subsButton.classList.replace('primary-button', 'secondary-button');
        });

        subsButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.renderSubsFeed();
            subsButton.classList.replace('secondary-button', 'primary-button');
            homeButton.classList.replace('primary-button', 'secondary-button');
        });
    }
}
