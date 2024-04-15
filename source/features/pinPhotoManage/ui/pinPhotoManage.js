import pinPhotoManageTemplate from './pinPhotoManage.handlebars';
import './pinPhotoManage.scss';
import {View} from '../../../app/View.js';
import {PinPhoto} from '../../../entity/pinPhoto/ui/pinPhoto.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';

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

    render(pin) {
        this.root.innerHTML = pinPhotoManageTemplate({pinView: true});
        const photo = new PinPhoto();
        photo.render(pin.content_url);
    }
    /**
     * Render photo in page
     * @function renderUpdate
     * @param {json} pin – pin information
     */
    renderUpdate(pin) {
        this.root.innerHTML = pinPhotoManageTemplate({pinView: true, photoRendered: true});

        const photo = new PinPhoto();
        photo.render(pin.content_url);
    }

    /**
     * Render pin photo block
     * @function renderCreate
     */
    renderCreate() {
        this.root.innerHTML = pinPhotoManageTemplate({pinView: false, photoRendered: false});
        const uploadInput = document.querySelector('#pin-photo-input');
        const photoImageBlock = document.querySelector('#photo-manage__image-block');
        const photoHoverBlock = document.querySelector('#photo-hover-block');

        const photo = new PinPhoto();
        photo.render('');

        uploadInput.addEventListener('change', (event) => {
            event.preventDefault();
            const image = uploadInput.files[0];
            console.log(image);
            const fileExtention = (/[.]/.exec(image.name)) ?
                /[^.]+$/.exec(image.name) : null;
            console.log(fileExtention[0], fileExtention[0].match(/^(png)|(jpg)|(jpeg)/));
            if (fileExtention && !fileExtention[0].match(/^(png)|(jpg)|(jpeg)/)){
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[18]);
            } else if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    photoImageBlock.classList.remove('photo_size');
                    photoHoverBlock.classList.add('hover-photo-block_opacity');
                    photo.render(event.target.result);
                };
                reader.readAsDataURL(image);
            }
        });
    }
}
