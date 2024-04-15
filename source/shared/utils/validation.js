/**
 * Check if email is valid
 * @function emailValidation
 * @param {string} email - Email to check.
 * @return {boolean} True if email is valid and false otherwise.
 */
export const emailValidation = (email) => {
    const regular = new RegExp('^[a-zA-Z0-9]{1,64}' +
        '@([a-zA-Zа-яёА-ЯЁ0-9]{1,63}\\.[a-zA-Zа-яёА-ЯЁ0-9]{1,63})$', 'u');
    return regular.test(email);
};
/**
 * Check if password is valid
 * @function passwordValidation
 * @param {string} password - Password to check.
 * @return {boolean} True if password is valid and false otherwise.
 */
export const passwordValidation = (password) => {
    return /[A-Z]+/.test(password) && /[0-9]+/.test(password) &&
      /^[a-zA-Z0-9]{8,24}$/.test(password);
};
/**
 * Checks if nickname is valid
 * @function nicknameValidation
 * @param {string} nick - Nickname to check.
 * @return {boolean} True if nickname is valid and false otherwise.
 */
export const nicknameValidation = (nick) => {
    const regular = new RegExp('^[0-9a-zA-Z_]{3,20}$');
    return regular.test(nick);
};
/**
 * Check if passwords are the same
 * @function repPasswordValidation
 * @param {string} pass - Password to compare with.
 * @param {string} repPass - Password to compare with.
 * @return {boolean} True if passwords are the same and false otherwise.
 */
export const repPasswordValidation = (pass, repPass) => pass === repPass;
