import {API} from "../../../modules/API.js";
import {Feed} from "../feed/feed.js";
import {Login} from "../login/login.js";
import {Navbar} from "../../widget/navbar/navbar.js";

export const Signup = () => {
  const template = Handlebars.templates.signup;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const signupButton = root.querySelector("#signup_enter_button");
  signupButton.addEventListener("click", () => {
    alert(api.signup());
    Navbar();
    Feed();
  });

  const loginButton = root.querySelector("#signup_login_button");
  loginButton.addEventListener("click", () => {
      Login();
  });
};
