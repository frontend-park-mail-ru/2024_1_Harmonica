/** @module source/components/pages/error */

import templateError from './error.handlebars';
import {View} from '../../app/View.js';
import './error.scss';

/**
 * Provides error view on site by rendering 'Handlebars.templates.error'.
 * @function Error
 */
export class Error extends View {
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('root');
    }
    render(message = 'Страница не найдена') {
        this.root.innerHTML = templateError({message: message});
    }
};
