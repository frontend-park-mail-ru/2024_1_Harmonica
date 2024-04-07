import pinPhotoTemplate from './pinPhoto.handlebars';
import './pinPhoto.css';
import {View} from '../../../app/View.js';

/**
 * Handle pins photo
 */
export class PinPhoto extends View {
    /**
     * Initialize values
     * @constructor
     * @param {Array} args – arguments to pass in parents constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('photo-manage__image-block');
    }

    /**
     * Render photo widget
     * @function render
     * @param {string} contentURL – URL of photo
     */
    render(contentURL) {
        this.root.innerHTML = pinPhotoTemplate({contentURL});
    }
}
