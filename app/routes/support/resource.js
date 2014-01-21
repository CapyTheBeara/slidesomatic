/* jshint eqeqeq: false */

import ErrorHandlingMixin from 'appkit/routes/support/error_handling_mixin';

export default Ember.Route.extend(
  ErrorHandlingMixin, {

  model: function(params) {
    return this.store.find(this.get('routeName'), params[this.get('routeName') + '_id']).then(function(model) {
      model.setPropertiesFromParams(params);
      return model;
    });
  },

  renderTemplate: function(controller, model) {
    var name = this.get('routeName');
    this.render(name, { outlet: name});
  }
});
