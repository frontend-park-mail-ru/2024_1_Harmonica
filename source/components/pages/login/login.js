import {API} from "../../../modules/API.js";
import {Feed} from "../feed/feed.js";
import {Signup} from "../signup/signup.js";
import {Navbar} from "../../widget/navbar/navbar.js";

export const Login = () => {
  const template = Handlebars.templates.login;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const enterButton = root.querySelector("#login_enter_button");
  enterButton.addEventListener("click", () =>{
      const email = root.querySelector("#login_email").value;
      const password = root.querySelector("#login_password").value;
      const post = {"email": email, "password": password};
      localStorage.setItem("user", JSON.stringify(api.login(post)));
      Navbar();
      Feed();
  });

  const signupButton = root.querySelector("#login_signup_button");
  signupButton.addEventListener("click", () => {
      Signup();
  });
};
