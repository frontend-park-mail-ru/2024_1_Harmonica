import pinWatchTemplate from './pinCRUD.handlebars';
import './pinCRUD.css';
import {View} from '../../../app/View.js';
import {PinPhotoWatch} from '../../../widgets/pinPhotoWatch/ui/pinPhotoWatch.js';
import {PinDescription} from '../../../widgets/pinDescription/ui/pinDescription.js';

/**
 * Handle pin page
 * @extends View
 */
export class PinCRUD extends View {
    /**
     * Initialize values
     * @param {Array} args – arguments to pass in parent class
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }

    /**
     * Function to render pin watch page
     * @function renderPinWatch
     * @param {json} pin – info about pin
     */
    renderPinWatch(pin) {
        this.root.innerHTML = pinWatchTemplate({pin});
        const pinPhoto = new PinPhotoWatch();
        pinPhoto.render(pin.content_url);
        const pinDesc = new PinDescription();
        pinDesc.render(pin);
    }
}
