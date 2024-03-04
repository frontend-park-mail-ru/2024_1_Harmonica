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
  signupButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const nickname = root.querySelector("#register_nickname").value;
    const email = root.querySelector("#register_email").value;
    const password = root.querySelector("#register_password").value;
    const repeatPassword = root.querySelector("#register_repeat_password").value; // Проверять совпадения
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
