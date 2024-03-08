import {API} from '../../../modules/API.js';
import {Feed} from '../feed/feed.js';
import {Signup} from '../signup/signup.js';
import {Navbar} from '../../widget/navbar/navbar.js';
import {emailValidation, passwordValidation} from '../../../modules/validation.js';
import {errors} from '../../../modules/config.js';
import {Error} from '../error/error.js';

const ERROR_COLOR = '#ff4545';

export const Login = () => {
  const template = Handlebars.templates.login;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const enterButton = root.querySelector('#login_enter_button');
  enterButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = root.querySelector('#login_email').value;
    const password = root.querySelector('#login_password').value;

    if (!emailValidation(email)) {
      emailAddErr(root, 'Это не похоже на email!');
      return;
    }

    if (!passwordValidation(password)) {
      passAddErr(root, 'В поле введен невалидный пароль!');
      return;
    }

    const post = {'email': email, 'password': password};
    const response = await api.login(post);
    if (response.status >= 400) {
      switch (response.body.code) {
        case 7:
          emailAddErr(root, errors[7]);
          break;
        case 8:
          passAddErr(root, errors[8]);
          break;
        default:
          Error(response);
          break;
      }
    } else {
      localStorage.setItem('user', JSON.stringify(response.body));
      Navbar();
      Feed();
    }
  });

  const signupButton = root.querySelector('#login_signup_button');
  signupButton.addEventListener('click', () => {
    Signup();
  });
};

const emailAddErr = (root, error) => {
  const emailErrBlock = root.querySelector('#login_email_error');
  const passErrBlock = root.querySelector('#login_password_error');
  passErrBlock.innerHTML = '';
  if (!emailErrBlock.innerHTML) {
    emailErrBlock.innerHTML = error;
  }
  const passInput = root.querySelector('#login_password');
  const emailInput = root.querySelector('#login_email');
  passInput.style.outlineColor = '';
  passInput.style.borderColor = '';
  emailInput.style.outlineColor = ERROR_COLOR;
  emailInput.style.borderColor = ERROR_COLOR;
};

const passAddErr = (root, error) => {
  const emailErrBlock = root.querySelector('#login_email_error');
  const passErrBlock = root.querySelector('#login_password_error');
  emailErrBlock.innerHTML = '';
  if (!passErrBlock.innerHTML) {
    passErrBlock.innerHTML = error;
  }
  const passInput = root.querySelector('#login_password');
  const emailInput = root.querySelector('#login_email');
  emailInput.style.outlineColor = '';
  emailInput.style.borderColor = '';
  passInput.style.outlineColor = ERROR_COLOR;
  passInput.style.borderColor = ERROR_COLOR;
};

export const Logout = async () => {
  localStorage.removeItem('user');
  const api = new API();
  const response = await api.logout();
  if (response.status >= 400) {
    Error(response);
    return;
  }
  Navbar();
  Feed();
};
