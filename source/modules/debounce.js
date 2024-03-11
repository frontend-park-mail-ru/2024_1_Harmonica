/** @module source/modules/debounce */

/**
 * Start debounce by timeout and function.
 * @function debounce
 * @param {function} func - The function to debounce.
 * @param {int} timeout - Timeout object.
 * @return {function} Function, that clears last timer and sets the new one executing 'func'.
 */
export const debounce = (func, timeout) => {
    let time;
    return function(...args) {
        clearTimeout(time);
        time = setTimeout(() => func(...args), timeout);
    };
};
