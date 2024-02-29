export const Navbar = () => {
    const template = Handlebars.templates.navbar;
    const root = document.querySelector("#root");
    root.InnerHTML = template;
}
