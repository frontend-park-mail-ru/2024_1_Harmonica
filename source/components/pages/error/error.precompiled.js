(function() {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {};
  templates['error'] = template({'compiler': [8, '>= 4.3.0'], 'main': function(container, depth0, helpers, partials, data) {
    const alias1=container.lambda; const alias2=container.escapeExpression; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined;
    };

    return '<main>\n    <div class="error">\n        <div class="error_status">\n            ' +
    alias2(alias1((depth0 != null ? lookupProperty(depth0, 'status') : depth0), depth0)) +
    ': ' +
    alias2(alias1((depth0 != null ? lookupProperty(depth0, 'message') : depth0), depth0)) +
    '\n        </div>\n        <div class="error_description">\n            ' +
    alias2(alias1((depth0 != null ? lookupProperty(depth0, 'description') : depth0), depth0)) +
    '\n        </div>\n    </div>\n</main>';
  }, 'useData': true});
})();
