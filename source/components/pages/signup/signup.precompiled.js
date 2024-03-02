(function() {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {};
  templates['signup'] = template({'compiler': [8, '>= 4.3.0'], 'main': function(container, depth0, helpers, partials, data) {
    return '<main>\n    <div class="window">\n        <h3 class="window_title">Зарегистрируйтесь, чтобы продолжить!</h3>\n        <form action="" class="window_login-fields">\n            <div class="window_input-fields">\n                <input type="text" class="text-input" placeholder="Имя пользователя">\n                <input type="email" class="text-input" placeholder="Email">\n                <input type="password" class="text-input" placeholder="Пароль">\n                <input type="password" class="text-input" placeholder="Повторите пароль">\n            </div>\n            <div class="button-field">\n                <button type="submit" class="primary-btn btn">Регистрация</button>\n                <button type="button" class="secondary-btn btn">Войти</button>\n            </div>\n        </form>\n    </div>\n</main>';
  }, 'useData': true});
})();
