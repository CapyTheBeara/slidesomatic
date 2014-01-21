/* jshint eqeqeq: false */

export default Ember.Route.extend({
  model: function(params) {
    var self = this;

    return this.store.find(this.get('routeName'), params[this.get('routeName') + '_id']).then(function(model) {
      model.setPropertiesFromParams(params);
      self.checkForErrors(model);
      return model;
    });
  },

  checkForErrors: function(model) {
    if (!model.get('valid')) {
      var error = new Error(model.get('validationState'));
      error.model = model;
      throw error;
    }
  },

  renderTemplate: function(controller, model) {
    var name = this.get('routeName');
    this.render(name, { outlet: name});
  }
});
