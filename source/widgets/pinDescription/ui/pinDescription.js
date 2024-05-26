import pinDescTemplate from './pinDescription.handlebars';
import './pinDescription.scss';
import {View} from '../../../app/View.js';
import {PinInformationBlock} from '../../../features/pinInformationBlock/ui/pinInformationBlock.js';
import {PinControllerBlock} from '../../../features/pinControllerBlock/ui/pinControllerBlock.js';
import {PinFormBlock} from '../../../features/pinFormBlock/ui/pinFormBlock.js';
import {
    PinFormControllerBlock,
} from '../../../features/pinFormControllerBlock/ui/pinFormControllerBlock.js';
import {CommentView} from '../../../entity/comment/ui/comment.js';
import {API} from '../../../shared/api/API.js';

/**
 * Handle pin description block
 */
export class PinDescription extends View {
    /**
     * Initialize start values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-description');
    }

    /**
     * Render pin description widget
     * @function renderView
     * @param {json} pin – pin info
     */
    async renderView(pin) {
        this.root.innerHTML = pinDescTemplate({pin});
        const topBlock = new PinInformationBlock();
        topBlock.render(pin);

        const api = new API(`/pin/comments/${pin.pin_id}`);
        const response = await api.get();
        if (response.code){
            response.body.comments = [];
        }

        const commentView = new CommentView('pin-block-center');
        if (response?.body?.comments) {
            for (const comment of response.body.comments) {
                commentView.render(comment);
            }
        }

        const bottomBlock = new PinControllerBlock();
        bottomBlock.render(pin);
    }

    /**
     * Function to render update content window
     * @function render
     * @param {json} pin - pin information
     */
    render(pin) {
        this.root.innerHTML = pinDescTemplate({pin});
        const topBlock = new PinFormBlock();
        topBlock.render(pin);
        const bottomBlock = new PinFormControllerBlock();
        bottomBlock.render();
    }
}
