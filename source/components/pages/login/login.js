import {API} from "../../../modules/API.js";
import {Feed} from "../feed/feed.js";
import {Signup} from "../signup/signup.js";
import {Navbar} from "../../widget/navbar/navbar.js";
import {emailValidation, passwordValidation} from "../../../modules/validation.js";

export const Login = () => {
  const template = Handlebars.templates.login;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const enterButton = root.querySelector("#login_enter_button");
  enterButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const email = root.querySelector("#login_email").value;
      const password = root.querySelector("#login_password").value;

      const emailErrBlock = root.querySelector("#login_email_error");
      if (!emailValidation(email)){
          emailErrBlock.innerHTML = "В поле введен невалидный email!Пример: example@email.com";
          return;
      } else {
          emailErrBlock.innerHTML = "";
      }

      const passErrBlock = root.querySelector("#login_password_error");
      if (!passwordValidation(password)){
          passErrBlock.innerHTML = "В поле введен невалидный пароль!";
          return;
      } else {
          passErrBlock.innerHTML = "";
      }

      const post = {"email": email, "password": password};
      const response = await api.login(post);
      if (response !== null) {
        localStorage.setItem("user", JSON.stringify(response));
        Navbar();
        Feed();
      }
  });

  const signupButton = root.querySelector("#login_signup_button");
  signupButton.addEventListener("click", () => {
      Signup();
  });
};

export const Logout = () => {
  localStorage.removeItem("user");
  const api = new API();
  api.logout();
  Navbar();
  Login();
}