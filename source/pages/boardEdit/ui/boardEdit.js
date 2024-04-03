import boardEditTemplate from './boardEdit.handlebars';
import './boardEdit.css';
import {View} from '../../../app/View.js';

export class BoardEdit extends View{
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    render(board){
        this.root.innerHTML = boardEditTemplate({board});
    }
}
