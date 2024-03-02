import {API} from "../../../modules/API.js";

export const Login = () => {
  const template = Handlebars.templates.login;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const enterButton = root.querySelector("#login_enter_button");
  enterButton.addEventListener("click", () =>{
      alert(api.login());
  });
};
