/** @module source/components/pages/error */

export const Error = (response) => {
    const template = Handlebars.templates.error;
    const root = document.getElementById('root');
    root.innerHTML = template({});
};
