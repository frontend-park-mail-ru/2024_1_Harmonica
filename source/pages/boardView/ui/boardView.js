import boardViewTemplate from './boardView.handlebars';
import './boardView.css';
import {View} from '../../../app/View.js';

export class BoardView extends View{
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    render(board){
        this.root.innerHTML = boardViewTemplate({board});
    }
}
