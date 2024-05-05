import {View} from '../../../app/View.js';
import feedWindowTemplate from './feedWindow.handlebars';
import './feedWindow.scss';
import {FeedBlockView} from '../../../features/feedBlock/ui/feedBlock.js';
import {PinFeedView} from '../../../entity/pin/ui/pin.js';

export class FeedWindowView extends View {
    constructor(rootID, ...args) {
        super(...args);
        this.root = document.querySelector(`#${rootID}`);
    }

    render(pins) {
        this.root.innerHTML = feedWindowTemplate({pins});

        if (pins) {
            const feedBlock = new FeedBlockView('feed');
            feedBlock.render(pins, PinFeedView);
        }
    }
}
