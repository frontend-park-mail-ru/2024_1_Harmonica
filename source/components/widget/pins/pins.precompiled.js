(function() {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {};
  templates['pin'] = template({'1': function(container, depth0, helpers, partials, data) {
    const lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined;
    };

    return '    <div class="feed_item">\n        <img src="' +
    container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0, 'content_url') : depth0), depth0)) +
    '" alt="">\n    </div>\n';
  }, 'compiler': [8, '>= 4.3.0'], 'main': function(container, depth0, helpers, partials, data) {
    let stack1; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined;
    };

    return ((stack1 = lookupProperty(helpers, 'each').call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, 'pins') : depth0), {'name': 'each', 'hash': {}, 'fn': container.program(1, data, 0), 'inverse': container.noop, 'data': data, 'loc': {'start': {'line': 1, 'column': 0}, 'end': {'line': 5, 'column': 9}}})) != null ? stack1 : '');
  }, 'useData': true});
})();
