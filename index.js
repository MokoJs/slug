var slugify = require('./deps/slug.js');

module.exports = function(attrs, fmt) {
    return function(Model) {
      Model.attr('slug');
      if(typeof attrs == 'string') {
        Model.on('initialize', function(model) {
          if(!model.slug) model.slug = slugify(model[attrs]);
        });
        Model.on('change ' + attrs, function(model) {
          model.slug = slugify(model[attrs]);
        });
      } else if(typeof fmt == 'string') {
        Model.on('initialize', function(model) {
          if(!model.slug) model.slug = formatString(model);
        });
        attrs.forEach(function(attr) {
          Model.on('change ' + attr, function(model) {
            model.slug = formatString(model);
          });
        });
      } else {
      }
    };
    function formatString(model) {
      var result = fmt;
      var replace = fmt.match(/:\w+/g);
      replace.forEach(function(attr) {
        var regex = new RegExp(attr, 'g');
        result = result.replace(regex, model[attr.slice(1)]);
      });
      return slugify(result);
    }
};
