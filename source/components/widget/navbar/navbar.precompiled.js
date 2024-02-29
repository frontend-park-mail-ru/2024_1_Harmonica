(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header class=\"navbar\">\n    <div class=\"navbar_row\">\n        <div class=\"navbar_left-block\">\n            <div class=\"logo\">\n                <span class=\"\">Pinterest</span>\n            </div>\n            <input type=\"text\" placeholder=\"Search\" class=\"search\">\n        </div>\n        <div class=\"navbar_right-block\">\n            <button class=\"primary-btn btn\">Log In</button>\n            <button class=\"secondary-btn btn\">Sign Up</button>\n        </div>\n    </div>\n</header>";
},"useData":true});
})();