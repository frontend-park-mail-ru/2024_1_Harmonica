/** @module source/modules/config */

/** The link to backend server. */
// export const backendAPI = 'http://85.192.35.36/:8080/api/v1'; // PROD
export const backendAPI = 'http://127.0.0.1:8080/api/v1'; // LOCAL

/** Descriptions of error's code. */
export const errors = {
    1: 'Пользователь уже авторизован',
    2: 'Пользователь не авторизован',
    3: 'Ошибка чтения cookie',
    4: 'Ошибка чтения тела ответа',
    5: 'Неправилный входной формат',
    6: 'Ошибка хэширования пароля',
    7: 'Этот email не зарегистрирован',
    8: 'Неверный пароль',
    9: 'Этот email уже зарегистрирован',
    10: 'Это имя пользователя занято',
    11: 'Ошибка базы данных',
    50: 'Потеряно соединение с сервером',
    51: 'Получено несколько ошибок',
};

/** Errors color. */
export const ERROR_COLOR = '#ff4545';
/** Fetch request debounceTimeout. */
export const debounceTimeout = 200;
