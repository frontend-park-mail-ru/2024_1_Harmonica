/** @module source/components/widget/pins */

/**
 * Provides pins view on site by rendering 'Handlebars.templates.pin'
 * @function Pins
 * @param {json} pins - Pins to render
 */
export const Pins = (pins) => {
    const template = Handlebars.templates.pin;
    const elem = document.createElement('div');
    elem.innerHTML = template({pins: pins});
    const root = document.getElementById('feed');
    root.appendChild(elem);
};
