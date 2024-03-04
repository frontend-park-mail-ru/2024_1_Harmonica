import {API} from "../../../modules/API.js";
import {Feed} from "../feed/feed.js";
import {Login} from "../login/login.js";
import {Navbar} from "../../widget/navbar/navbar.js";
import {emailValidation, passwordValidation} from "../../../modules/validation.js";

export const Signup = () => {
  const template = Handlebars.templates.signup;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const signupButton = root.querySelector("#signup_enter_button");
  signupButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const nickname = root.querySelector("#register_nickname").value;
    const email = root.querySelector("#register_email").value;
    const password = root.querySelector("#register_password").value;
    const repeatPassword = root.querySelector("#register_repeat_password").value;

    const emailErrBlock = root.querySelector("#signup_email_error");
    if (!emailValidation(email)){
      emailErrBlock.innerHTML = "В поле введен невалидный email!\nПример: example@email.com";
    } else {
      emailErrBlock.innerHTML = "";
    }

    const passErrBlock = root.querySelector("#signup_password_error");
    if (!passwordValidation(password)){
      passErrBlock.innerHTML = "В поле введен невалидный пароль! Пароль должен содержать:\n" +
          "–от 8 до 24 букв латинского алфавита\n–Хотя бы одну заглавную букву\n–Хотя бы одну цифру";
    } else if (password !== repeatPassword){
      passErrBlock.innerHTML = "Пароли не совпадают";
    }
    else {
      passErrBlock.innerHTML = "";
    }

    const nickErrBlock = root.querySelector("#signup_nickname_error");
    if (!passwordValidation(nickname)){
      nickErrBlock.innerHTML = "В поле введен невалидное имя пользователя!\nИмя пользователя должно содержать:\n" +
          "–от 3 до 20 букв латинского алфавита, цифр и знак '_'";
    } else {
      nickErrBlock.innerHTML = "";
    }

    if (nickErrBlock || emailErrBlock || passErrBlock) {
      return;
    }

    const post = {"email": email, "password": password, "nickname": nickname};
    if (await api.signup(post)) {
      Login();
    }
  });

  const loginButton = root.querySelector("#signup_login_button");
  loginButton.addEventListener("click", () => {
      Login();
  });
};
