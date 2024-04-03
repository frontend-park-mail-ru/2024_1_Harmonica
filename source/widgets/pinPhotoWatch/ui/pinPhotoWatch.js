import pinPhotoTemplate from './pinPhotoWatch.handlebars';
import './pinPhotoWatch.css';
import {View} from '../../../app/View.js';

/**
 * Handle pins photo
 */
export class PinPhotoWatch extends View {
    /**
     * Initialize values
     * @constructor
     * @param {Array} args – arguments to pass in parents constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-photo');
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
