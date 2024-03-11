/** @module source/components/pages/error */

/**
 * Provides error view on site by rendering 'Handlebars.templates.error'.
 * @function Error
 * @param {json} response 
 */
export const Error = (response) => {
    const template = Handlebars.templates.error;
    const root = document.getElementById('root');
    root.innerHTML = template({});
};
