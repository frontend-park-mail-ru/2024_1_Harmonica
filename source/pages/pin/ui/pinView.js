import pinViewTemplate from './pinView.handlebars';
import './pinView.scss';
import {View} from '../../../app/View.js';
import {PinDescription} from '../../../widgets/pinDescription/ui/pinDescription.js';
import {PinPhotoManage} from '../../../features/pinPhotoManage/ui/pinPhotoManage.js';
import {PinAPI} from '../api/api.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';
import {Error} from '../../error/ui/error.js';
import {pinValidation} from '../../../shared/utils/validation.js';
import {Profile} from '../../profile/ui/profile.js';
import {PinAddToBoardView} from '../../../features/pinAddToBoard/ui/pinAddToBoard.js';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';
import {ModalListWindowView} from '../../../widgets/modalWindow/ui/modalWindow.js';

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

        if (localStorageGetValue('user')) {
            const boardAdd = document.querySelector('#pin-board-add');
            boardAdd.addEventListener('click', async (event) => {
                event.preventDefault();
                const addPin = new ModalListWindowView();
                addPin.render(PinAddToBoardView, pin);
            });
        }
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
            const user = JSON.parse(localStorage.getItem('user'));
            history.pushState(null, null, '/profile/' + user.nickname);
        });

        const createSubmit = this.root.querySelector('#pin-form-save');
        createSubmit.addEventListener('click', async (event) =>{
            event.preventDefault();
            const title = this.root.querySelector('#title-input');
            const description = this.root.querySelector('#description-input');

            if (pinValidation(title, description)) {
                const pinObj = {
                    title: title.value,
                    description: description.value,
                };

                const api = new PinAPI(pin.pin_id);
                const response = await api.apiPOST(JSON.stringify(pinObj));

                if (response.code) {
                    const errorWindow = new ErrorWindowView();
                    errorWindow.render(errors[response.code]);
                    return;
                }

                // TODO добавить сслыку на изменение
                const newPin = new PinView();
                newPin.render(pin.pin_id);
            }
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
            const user = JSON.parse(localStorage.getItem('user'));
            const profile = new Profile();
            profile.render(user.nickname);
        });

        const createSubmit = this.root.querySelector('#pin-form-save');
        createSubmit.addEventListener('click', async (event) =>{
            event.preventDefault();
            const title = this.root.querySelector('#title-input');
            const description = this.root.querySelector('#description-input');

            if (pinValidation(title, description)) {
                const pin = {
                    title: title.value,
                    description: description.value,
                };

                const uploadInput = document.querySelector('#pin-photo-input');
                const image = uploadInput.files[0];
                if (!image) {
                    const errorWindow = new ErrorWindowView();
                    errorWindow.render(errors[19]);
                } else {
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
                    history.pushState(null, null, '/pin/' + response.body.pin_id);
                }
            }
        });
    }
}
