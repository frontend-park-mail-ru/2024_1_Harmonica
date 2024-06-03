import {View} from '../../../app/View.js';
import feedViewTemplate from './FeedView.handlebars';
import './FeedView.scss';
import {API} from '../../../shared/api/API.js';
import {NavbarView} from '../../../widgets/navbar/ui/navbar.js';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';
import {FeedWindowView} from '../../../widgets/feedWindow/ui/feedWindow.js';

export class FeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
        this.user = localStorageGetValue('user');
    }

    async renderHomeFeed() {
        const api = new API('/pins');
        const response = await api.get();

        const pins = response.body.pins;
        const feed = new FeedWindowView('feed-block');
        feed.render(pins);

        // const feedInnerBlock = document.querySelector('#feed');
        //         feedInnerBlock.style.width = elemWidth + "px";
        // const widthRecount = () => {
        //     const width = window.innerWidth;
        //     let pinWidth = 250;
        //     let columnsCount = 5;
        //     if (width < 1024) {
        //         if (width > 430) {
        //             pinWidth = 200;
        //             columnsCount = 5;
        //         } else {
        //             pinWidth = 150;
        //             columnsCount = 2;
        //         }
        //     }
        //
        //     if (this.currentWidth !== pinWidth) {
        //         this.currentWidth = pinWidth;
        //
        //         let elemWidth = columnsCount * pinWidth + (columnsCount - 1) * 20;
        //
        //         const feedInnerBlock = document.querySelector('#feed');
        //         feedInnerBlock.style.width = elemWidth + "px";
        //     }
        // }
        //
        // widthRecount();
        //
        // addEventListener('resize', (event) => {
        //     event.preventDefault();
        //     widthRecount();
        // })
    }

    async renderSubsFeed() {
        const api = new API('/pins?type=subscriptions');
        const response = await api.get();

        const pins = response.body.pins;
        const feed = new FeedWindowView('feed-block');
        feed.render(pins);
    }

    async render() {
        if (localStorageGetValue('user') !== this.user) {
            const navbar = new NavbarView();
            navbar.render();
            this.user = localStorageGetValue('user');
        }

        const user = localStorageGetValue('user');
        this.root.innerHTML = feedViewTemplate({user});

        await this.renderHomeFeed();

        if (user) {
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
}
