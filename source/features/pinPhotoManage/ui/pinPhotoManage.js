import pinPhotoManageTemplate from './pinPhotoManage.handlebars';
import './pinPhotoManage.css';
import {View} from '../../../app/View.js';
import {PinPhoto} from '../../../entity/pinPhoto/ui/pinPhoto.js';

/**
 * Handle and render photo in create/delete page
 */
export class PinPhotoManage extends View {
    /**
     * Initialize variables
     * @constructor
     * @param {Array} args – arguments to pass into parents constructor
     */
    constructor(...args) {
        super(...args);
        this.root = document.querySelector('#pin-photo');
    }

    /**
     * Render photo in page
     * @function renderUpdate
     * @param {json} pin – pin information
     */
    renderUpdate(pin) {
        const photo = new PinPhoto();
        photo.render(pin.content_url);
        this.root.innerHTML += pinPhotoManageTemplate({photoRendered: true});
    }

    /**
     * Render pin photo block
     * @function renderCreate
     */
    renderCreate() {
        const photo = new PinPhoto();
        photo.renderCreate();
        this.root.innerHTML += pinPhotoManageTemplate({photoRendered: false});
    }
}
