import {API} from '../../../modules/API.js';
import {Feed} from '../feed/feed.js';
import {Signup} from '../signup/signup.js';
import {Navbar} from '../../widget/navbar/navbar.js';
import {emailValidation, passwordValidation} from '../../../modules/validation.js';
import {ERROR_COLOR, errors} from '../../../modules/config.js';
import {Error} from '../error/error.js';

const errFields = [
  {
    errContent: '#login_email_error',
    inputField: '#login_email',
  },
  {
    errContent: '#login_password_error',
    inputField: '#login_password',
  }];

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
      errorHandle(root, '#login_email', 'Это не похоже на email!');
      return;
    }

    if (!passwordValidation(password)) {
      errorHandle(root, '#login_password', 'В поле введен невалидный пароль!');
      return;
    }

    const post = {'email': email, 'password': password};
    const response = await api.login(post);
    if (response.status >= 400) {
      switch (response.body.code) {
        case 7:
          errorHandle(root, '#login_email', errors[7]);
          break;
        case 8:
          errorHandle(root, '#login_password', errors[8]);
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

const errorHandle = (root, blockID, error) =>{
  for (let block of errFields) {
    const input = root.querySelector(block.inputField);
    const errorField = root.querySelector(block.errContent);
    if (block.inputField !== blockID) {
      input.style.outlineColor = '';
      input.style.borderColor = '';
      errorField.innerHTML = '';
      continue;
    }
    input.style.outlineColor = ERROR_COLOR;
    input.style.borderColor = ERROR_COLOR;
    if(errorField.innerHTML !== error){
      errorField.innerHTML = error;
    }
  }
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
