(function() {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {};
  templates['login'] = template({'compiler': [8, '>= 4.3.0'], 'main': function(container, depth0, helpers, partials, data) {
    return '<main>\n    <div class="window">\n        <h3 class="window_title">Добро пожаловать в Pinterest!</h3>\n        <form action="" class="window_login-fields">\n            <div class="window_input-fields">\n                <input type="text" class="text-input" placeholder="Email" id="login_email">\n                <div class="input_error" id="login_email_error"></div>\n                <input type="password" class="text-input" placeholder="Пароль" id="login_password">\n                <div class="input_error" id="login_password_error"></div>\n            </div>\n            <div class="button-field">\n                <button type="submit" class="primary-btn btn" id="login_enter_button">Войти</button>\n                <button class="secondary-btn btn" id="login_signup_button">Регистрация</button>\n            </div>\n        </form>\n    </div>\n</main>\n';
  }, 'useData': true});
})();
