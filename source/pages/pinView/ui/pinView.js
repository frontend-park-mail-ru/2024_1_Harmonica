import pinViewTemplate from './pinView.handlebars';
import './pinView.css';
import {View} from '../../../app/View.js';
import {PinPhoto} from '../../../entity/pinPhoto/ui/pinPhoto.js';
import {PinDescription} from '../../../widgets/pinDescription/ui/pinDescription.js';
import {PinPhotoManage} from '../../../features/pinPhotoManage/ui/pinPhotoManage.js';
import {PinAPI} from '../api/api.js';
import {Profile} from '../../profile/ui/profile.js';

/**
 * Handle pin page
 * @extends View
 */
export class PinView extends View {
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
     * @function renderPin
     * @param {json} pinID – pin's ID
     */
    async renderPin(pinID) {
        const pinAPI = new PinAPI(pinID);
        const response = await pinAPI.api()
        const pin = response.body;
        console.log(pin);
        this.root.innerHTML = pinViewTemplate({pin});
        const pinPhoto = new PinPhoto();
        pinPhoto.render(pin.content_url);
        const pinDesc = new PinDescription();
        pinDesc.renderView(pin);
    }

    /**
     * Function to render pin update page
     * @function renderPinUpdate
     * @param {json} pin – pin information
     */
    renderPinUpdate(pin) {
        this.root.innerHTML = pinViewTemplate({pin});
        const pinPhotoManage = new PinPhotoManage();
        pinPhotoManage.renderUpdate(pin);
        const pinDesc = new PinDescription();
        pinDesc.render(pin);
    }

    /**
     * Render pin creation window
     * @function renderPinCreate
     */
    renderPinCreate() {
        this.root.innerHTML = pinViewTemplate({});
        const pinPhotoManage = new PinPhotoManage();
        pinPhotoManage.renderCreate();
        const pinDesc = new PinDescription();
        pinDesc.render({});

        const profileButton = this.root.querySelector('#form-control-back');
        profileButton.addEventListener('click', async () => {
            const profile = new Profile();
            const user = JSON.parse(localStorage.getItem('user'));
            await profile.render(user.nickname);
        });
    }
}
