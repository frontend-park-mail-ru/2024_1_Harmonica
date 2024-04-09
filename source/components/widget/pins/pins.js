/** @module source/components/widget/pins */

import templatePins from './pins.handlebars';
import {PinView} from '../../../pages/pinView/ui/pinView.js';

/**
 * Provides pins view on site by rendering 'Handlebars.templates.pin'
 * @function Pins
 * @param {json} pins - Pins to render
 * @param {string} element - id of root
 */
export const Pins = (pins, element = 'feed') => {
    const elem = document.createElement('div');
    elem.innerHTML = templatePins({pins: pins});
    const root = document.getElementById(element);
    root.appendChild(elem);
    for (let pin of pins) {
        const pinElem = document.getElementById('pin-' + pin.pin_id.toString());
        pinElem.addEventListener('click', (event) => {
            event.preventDefault();
            const pinView = new PinView();
            pinView.renderPin(pin.pin_id);
        })
    }
};
