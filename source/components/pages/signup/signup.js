export const Signup = () => {
  const template = Handlebars.templates.signup;
  const root = document.getElementById('root');
  root.innerHTML = template({});
};
