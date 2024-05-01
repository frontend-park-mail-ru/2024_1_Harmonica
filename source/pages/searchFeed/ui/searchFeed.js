import {View} from '../../../app/View.js';
import searchFeedTemplate from './searchFeed.handlebars';
import './searchFeed.scss';

export class SearchFeedView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#root');
    }

    render() {
        this.root.innerHTML = searchFeedTemplate({});
        const buttons = [
            {
                root: this.root.querySelector('#search-pin-button')
            },
            {
                root: this.root.querySelector('#search-board-button')
            },
            {
                root: this.root.querySelector('#search-users-button')
            },
        ]

        for (let object of buttons) {
            const button = object.root;
            button.addEventListener('click', (event) => {
                event.preventDefault();
                button.classList.replace('secondary-button', 'primary-button');
                for (let secObject of buttons){
                    const secButton = secObject.root;
                    if (secButton !== button) {
                        secButton.classList.replace('primary-button', 'secondary-button');
                    }
                }
            });
        }
    }
}
