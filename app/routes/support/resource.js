/* jshint eqeqeq: false */

import ErrorHandlingMixin from 'appkit/routes/support/error_handling_mixin';

export default Ember.Route.extend(
  ErrorHandlingMixin, {

  name: null,

  model: function(params) {
    return this.store.find(this.get('name'), params[this.get('name') + '_id']).then(function(model) {
      model.setPropertiesFromParams(params);
      return model;
    });
  },

  renderTemplate: function(controller, model) {
    this.render('deck', { outlet: 'deck'});
  }
});
