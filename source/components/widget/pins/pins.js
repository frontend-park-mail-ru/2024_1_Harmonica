/** @module source/components/widget/pins */

import templatePins from './pins.handlebars';

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
};
