import boardEditTemplate from './boardEdit.handlebars';
import './boardEdit.css';
import {View} from '../../../app/View.js';

export class BoardEdit extends View{
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    renderUpdateBoard(board){
        this.root.innerHTML = boardEditTemplate({board});
    }

    renderCreateBoard(){
        this.root.innerHTML = boardEditTemplate({});
    }
}
