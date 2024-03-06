import {API} from "../../../modules/API.js";
import {Feed} from "../feed/feed.js";
import {Signup} from "../signup/signup.js";
import {Navbar} from "../../widget/navbar/navbar.js";
import {emailValidation, passwordValidation} from "../../../modules/validation.js";
import {errors} from "../../../modules/config.js";
import {Error} from "../error/error.js";

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
      const passErrBlock = root.querySelector("#login_password_error");
      if (!emailValidation(email)){
          passErrBlock.innerHTML = "";
          emailErrBlock.innerHTML = "В поле введен невалидный email!Пример: example@email.com";
          return;
      }

      if (!passwordValidation(password)){
          emailErrBlock.innerHTML = "";
          passErrBlock.innerHTML = "В поле введен невалидный пароль!";
          return;
      }

      const post = {"email": email, "password": password};
      const response = await api.login(post);
      if (response.status >= 400) {
          const emailErrBlock = root.querySelector("#login_email_error");
          const passErrBlock = root.querySelector("#login_password_error");
          switch (response.body.code){
              case 7:
                  if (!emailErrBlock.innerHTML) {
                      passErrBlock.innerHTML = "";
                      emailErrBlock.innerHTML = errors[7];
                  }
                  break;
              case 8:
                  if (!passErrBlock.innerHTML) {
                      emailErrBlock.innerHTML = "";
                      passErrBlock.innerHTML = errors[8];
                  }
                  break;
              default:
                  Error(response);
                  break;
          }
      } else {
          localStorage.setItem("user", JSON.stringify(response.body));
          Navbar();
          Feed();
      }
  });

  const signupButton = root.querySelector("#login_signup_button");
  signupButton.addEventListener("click", () => {
      Signup();
  });
};

export const Logout = async () => {
    localStorage.removeItem("user");
    const api = new API();
    const response = await api.logout();
    if (response.status >= 400){
        Error(response);
        return;
    }
    Navbar();
    Feed();
}
