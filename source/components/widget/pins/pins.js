/** @module source/components/widget/pins */

import templatePins from './pins.handlebars';
import {PinView} from '../../../pages/pinView/ui/pinView.js';

/**
 * Provides pins view on site by rendering 'Handlebars.templates.pin'
 * @function Pins
 * @param {json} pins - Pins to render
 */
export const Pins = (pins) => {
    const elem = document.createElement('div');
    elem.innerHTML = templatePins({pins: pins});
    const root = document.getElementById('feed');
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
