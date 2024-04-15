import pinViewTemplate from './pinView.handlebars';
import './pinView.scss';
import {View} from '../../../app/View.js';
import {PinDescription} from '../../../widgets/pinDescription/ui/pinDescription.js';
import {PinPhotoManage} from '../../../features/pinPhotoManage/ui/pinPhotoManage.js';
import {PinAPI} from '../api/api.js';
import {Profile} from '../../profile/ui/profile.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';
import {Error} from '../../error/error.js';

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
     * @function render
     * @param {json} pinID – pin's ID
     */
    async render(pinID) {
        const pinAPI = new PinAPI(pinID);
        const response = await pinAPI.api();
        if (response.code !== 0) {
            const errorView = new Error();
            errorView.render();
            return;
        }
        const pin = response.body;

        this.root.innerHTML = pinViewTemplate({pin});
        const pinPhotoManager = new PinPhotoManage();
        pinPhotoManager.render(pin);

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

        const backButton = this.root.querySelector('#form-control-back');
        backButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const pinView = new PinView();
            await pinView.render(pin.pin_id);
        });

        const createSubmit = this.root.querySelector('#pin-form-save');
        createSubmit.addEventListener('click', async (event) =>{
            event.preventDefault();
            const title = this.root.querySelector('#title-input').value;
            const description = this.root.querySelector('#description-input').value;
            const pinObj = {title, description};

            const api = new PinAPI(pin.pin_id);
            const response = await api.apiPOST(JSON.stringify(pinObj));

            if (response.code) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const pinView = new PinView();
            await pinView.render(pin.pin_id);
        });
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
        profileButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const profile = new Profile();
            const user = JSON.parse(localStorage.getItem('user'));
            await profile.render(user.nickname);
        });

        const createSubmit = this.root.querySelector('#pin-form-save');
        createSubmit.addEventListener('click', async (event) =>{
            event.preventDefault();
            const title = this.root.querySelector('#title-input').value;
            const description = this.root.querySelector('#description-input').value;
            const pin = {title, description};

            const uploadInput = document.querySelector('#pin-photo-input');
            const image = uploadInput.files[0];
            const formData = new FormData();
            formData.append('image', image);
            formData.append('pin', JSON.stringify(pin));

            const api = new PinAPI(null);
            const response = await api.apiPOST(formData);

            if (response.code) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const pinView = new PinView();
            await pinView.render(response.body.pin_id);
        });
    }
}
