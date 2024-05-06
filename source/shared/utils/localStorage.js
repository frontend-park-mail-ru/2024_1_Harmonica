
export const localStorageSetValue = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return null;
    }
};


export const localStorageGetValue = (key) => {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    }
    return JSON.parse(value);
};
