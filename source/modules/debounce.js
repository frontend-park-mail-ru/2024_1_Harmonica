export const debounce = (func, timeout) => {
    let time;
    return function(...args) {
        clearTimeout(time);
        time = setTimeout(() => func(...args), timeout);
    };
};
