(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"navbar_user_name\" id=\"navbar_user_name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"nickname") : stack1), depth0))
    + "</div>\n                <button class=\"primary-btn btn\" id=\"navbar_logout_button\">Выход</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"primary-btn btn\" id=\"navbar_login_button\">Войти</button>\n                <button class=\"secondary-btn btn\" id=\"navbar_signup_button\">Регистрация</button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"navbar\">\n    <div class=\"navbar_row\">\n        <div class=\"navbar_left-block\">\n            <div class=\"logo\" id=\"navbar_logo\">\n                <span class=\"\">Harmonium</span>\n            </div>\n            <input type=\"text\" placeholder=\"Поиск\" class=\"search\">\n        </div>\n        <div class=\"navbar_right-block\" id=\"navbar_login_menu\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":16,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</header>\n";
},"useData":true});
})();