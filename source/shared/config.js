/** @module source/modules/config */

/** The link to frontend server. */
export const frontendURL = 'https://harmoniums.ru'; // PROD
// export const frontendURL = 'http://localhost'; // LOCAL

/** The link to backend server. */
export const backendAPI = 'https://harmoniums.ru/api/v1'; // PROD
// export const backendAPI = 'http://localhost/api/v1'; // LOCAL

/** Descriptions of error's code. */
export const errors = {
    '1': 'Пользователь уже авторизован',
    '2': 'Пользователь не авторизован',
    '3': 'Ошибка чтения cookie',
    '4': 'Ошибка чтения тела ответа',
    '5': 'Неправильный входной формат',
    '6': 'Ошибка хэширования пароля',
    '7': 'Этот email не зарегистрирован',
    '8': 'Неверный пароль',
    '9': 'Этот email уже зарегистрирован',
    '10': 'Это имя пользователя занято',
    '11': 'Ошибка базы данных',
    '12': 'Неверный параметр SLUG',
    '13': 'UserID не совпадает в SLUG и в параметрах',
    '14': 'Данный пользователь не обладает запращиваемыми правами',
    '15': 'Требуется поле content_url',
    '16': 'Поле content_url не может быть пустым',
    '17': 'Неверный заголовок content_type',
    '18': 'Передано неверное расширение файла, должно быть jpeg/jpg/png',
    '19': 'Не загружена картинка',
    '20': 'Элемент не существует',
    '21': 'Ошибка преобразования типов',
    '22': 'Объект уже существует в базе данных',
    '50': 'Потеряно соединение с сервером',
    '51': 'Получено несколько ошибок',
    '60': 'Ошибка локального хранилища',
    'oops': 'Упс... У нас что-то сломалось, но мы это чиним',
};

/** Errors color. */
export const ERROR_COLOR = '#ff4545';
export const NORMAL_COLOR = '#111111';
export const SUCCESS_COLOR = '#3d931d';
/** Fetch request debounceTimeout. */
export const debounceTimeout = 200;
