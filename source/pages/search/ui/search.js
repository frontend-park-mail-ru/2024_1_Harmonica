import {View} from '../../../app/View.js';
import searchTemplate from './search.handlebars';
import './search.scss';
import {SearchFeedView} from '../../../widgets/searchFeed/index.js';
import {API} from '../../../shared/api/API.js';

export class SearchView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async render(searchQuery) {
        const api = new API(`/search/${searchQuery}`);
        const response = await api.get();
        const body = response.body;

        this.root.innerHTML = searchTemplate({});
        const feed = new SearchFeedView('search-feed');
        await feed.renderPins(body.pins);

        const buttons = [
            {
                root: this.root.querySelector('#search-pin-button'),
                render: 'renderPins',
                content: body.pins,
            },
            {
                root: this.root.querySelector('#search-board-button'),
                render: 'renderBoards',
                content: body.boards,
            },
            {
                root: this.root.querySelector('#search-users-button'),
                render: 'renderUsers',
                content: body.users,
            },
        ];

        for (const object of buttons) {
            const button = object.root;
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                button.classList.replace('secondary-button', 'primary-button');
                for (const secObject of buttons) {
                    const secButton = secObject.root;
                    if (secButton !== button) {
                        secButton.classList.replace('primary-button', 'secondary-button');
                    }
                }
                await feed[object.render](object.content);
            });
        }
    }
}
