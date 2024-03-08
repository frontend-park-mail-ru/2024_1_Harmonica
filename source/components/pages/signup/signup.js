import {API} from '../../../modules/API.js';
import {Login} from '../login/login.js';
import {emailValidation, nicknameValidation, passwordValidation} from '../../../modules/validation.js';
import {errors} from '../../../modules/config.js';
import {Error} from '../error/error.js';
import {Navbar} from '../../widget/navbar/navbar.js';
import {Feed} from '../feed/feed.js';

export const Signup = () => {
  const template = Handlebars.templates.signup;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const signupButton = root.querySelector('#signup_enter_button');
  signupButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const nickname = root.querySelector('#register_nickname').value;
    const email = root.querySelector('#register_email').value;
    const password = root.querySelector('#register_password').value;
    const repeatPassword = root.querySelector('#register_repeat_password').value;

    const emailErrBlock = root.querySelector('#signup_email_error');

    let errorCheck;
    if (!emailValidation(email)) {
      emailErrBlock.innerHTML = 'В поле введен невалидный email!\nПример: example@email.com';
      errorCheck = true;
    } else {
      emailErrBlock.innerHTML = '';
    }

    const passErrBlock = root.querySelector('#signup_password_error');
    if (!passwordValidation(password)) {
      passErrBlock.innerHTML = 'В поле введен невалидный пароль! Пароль должен содержать:\n' +
          '–от 8 до 24 букв латинского алфавита\n–Хотя бы одну заглавную букву\n–Хотя бы одну цифру';
      errorCheck = true;
    } else if (password !== repeatPassword) {
      passErrBlock.innerHTML = 'Пароли не совпадают';
      errorCheck = true;
    } else {
      passErrBlock.innerHTML = '';
    }

    const nickErrBlock = root.querySelector('#signup_nickname_error');
    if (!nicknameValidation(nickname)) {
      nickErrBlock.innerHTML = 'В поле введен невалидное имя пользователя!\nИмя пользователя должно содержать:\n' +
          '–от 3 до 20 букв латинского алфавита, цифр и знак \'_\'';
      errorCheck = true;
    } else {
      nickErrBlock.innerHTML = '';
    }

    if (errorCheck) {
      return;
    }

    const post = {'email': email, 'password': password, 'nickname': nickname};
    const response = await api.signup(post);
    if (response.status >= 400) {
      switch (response.body.code) {
        case 9:
          const emailErrBlock = root.querySelector('#signup_email_error');
          emailErrBlock.innerHTML = errors[9];
          break;
        case 10:
          const nickErrBlock = root.querySelector('#signup_nickname_error');
          nickErrBlock.innerHTML = errors[10];
          break;
        default:
          Error(response);
          break;
      }
    } else {
      // Login();
      localStorage.setItem('user', JSON.stringify(response.body));
      Navbar();
      Feed();
    }
  });

  const loginButton = root.querySelector('#signup_login_button');
  loginButton.addEventListener('click', () => {
    Login();
  });
};
