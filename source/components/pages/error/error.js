/** @module source/components/pages/error */

import templateError from './error.handlebars';

/**
 * Provides error view on site by rendering 'Handlebars.templates.error'.
 * @function Error
 */
export const Error = () => {
    const root = document.getElementById('root');
    root.innerHTML = templateError({});
};
