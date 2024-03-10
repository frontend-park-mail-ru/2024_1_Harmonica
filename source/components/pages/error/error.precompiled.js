(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['error'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main>\n    <div class=\"error\">\n        <div class=\"error_status\">\n            Упсс... кажется что-то не так\n        </div>\n        <div class=\"error_description\">\n            У нас произошла проблема, но мы ее чиним\n        </div>\n    </div>\n</main>\n";
},"useData":true});
})();