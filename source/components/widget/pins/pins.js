/** @module source/components/widget/pins */

import templatePins from './pins.handlebars';
import {PinView} from '../../../pages/pinView/ui/pinView.js';
import './pins.css';

/**
 * Provides pins view on site by rendering 'Handlebars.templates.pin'
 * @function Pins
 * @param {json} pins - Pins to render
 * @param {string} element - id of root
 * @param {boolean} pinControl – render pin control buttons
 */
export const Pins = (pins, element = 'feed', pinControl = false) => {
    const elem = document.createElement('div');
    elem.classList.add('pin-list');
    elem.innerHTML = templatePins({
        pins: pins,
        pinControl: pinControl,
    });
    const root = document.getElementById(element);
    root.appendChild(elem);
    for (let pin of pins) {
        const pinElem = document.getElementById('pin-' + pin.pin_id.toString());
        pinElem.addEventListener('click', async (event) => {
            event.preventDefault();
            const pinView = new PinView();
            await pinView.render(pin.pin_id);
        })
    }
};
