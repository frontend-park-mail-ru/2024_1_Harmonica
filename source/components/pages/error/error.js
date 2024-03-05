import {errors} from "../../../modules/config.js";

export const Error = (response) => {
    const template = Handlebars.templates.error;
    const root = document.getElementById('root');
    root.innerHTML = template({
        "status": response.status,
        "message": response.statusText,
        "description": errors[response.body.code],
    });
}
