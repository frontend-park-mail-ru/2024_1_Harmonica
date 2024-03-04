export const emailValidation = (email) => {
    const regular = new RegExp("^[a-zA-Z0-9\.\#\$\%\&\'\*\+\\-\/\=\?\^\_\`\{\|\}\~]{1,64}" +
        "\@([a-zA-Z0-9]{1,63}\.[a-zA-Z0-9]{1,63})$");
    return regular.test(email);
};

export const passwordValidation = (password) => {
    return /[A-Z]+/.test(password) && /[0-9]+/.test(password) && /^[a-zA-Z0-9]{8,24}$/.test(password);
};

export const nicknameValidation = (nick) => {
    const regular = new RegExp("^[0-9a-zA-Z_]{3,20}$");
    return regular.test(nick);
};