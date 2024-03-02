(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main>\n    <div class=\"window\">\n        <h3 class=\"window_title\">Добро пожаловать в Pinterest!</h3>\n        <form action=\"\" class=\"window_login-fields\">\n            <div class=\"window_input-fields\">\n                <input type=\"email\" class=\"text-input\" placeholder=\"Email\">\n                <input type=\"password\" class=\"text-input\" placeholder=\"Пароль\">\n            </div>\n            <div class=\"button-field\">\n                <button type=\"submit\" class=\"primary-btn btn\" id=\"login_enter_button\">Войти</button>\n                <button class=\"secondary-btn btn\" id=\"login_signup_button\">Регистрация</button>\n            </div>\n        </form>\n    </div>\n</main>";
},"useData":true});
})();