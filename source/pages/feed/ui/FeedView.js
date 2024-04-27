import {View} from '../../../app/View.js';
import FeedViewTemplate from './FeedView.handlebars';
import './FeedView.scss';
import {API} from '../../../shared/api/API.js';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';
import {NavbarView} from '../../../widgets/navbar/ui/navbar.js';
import {CsatWindow} from '../../../widgets/csatWindow/index.js';

export class FeedView extends View {
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    async render() {
        const navbar = new NavbarView();
        navbar.render();
        this.root.innerHTML = FeedViewTemplate({});
        const api = new API('/pins');
        const response = await api.GET();
        const pins = response.body.pins;
        const feedBlock = new FeedBlockView('feed');
        feedBlock.render(pins, PinFeedView);

        const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            const csat = new CsatWindow();
            csat.render();
        }
    }
}
