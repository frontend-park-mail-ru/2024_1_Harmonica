/** @module source/components/pages/error */

/**
 * Provides error view on site by rendering 'Handlebars.templates.error'.
 * @function Error
 */
export const Error = () => {
    const template = Handlebars.templates.error;
    const root = document.getElementById('root');
    root.innerHTML = template({});
};
