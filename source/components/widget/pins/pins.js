export const Pins = (pins) => {
    const template = Handlebars.templates.pin;
    const elem = document.createElement('div');
    elem.innerHTML = template({pins: pins});
    const root = document.getElementById('feed');
    root.appendChild(elem);
};
