export default Ember.Route.extend({
  setupController: function() {
    this.controllerFor('application').set('modalMode', true);
  },

  deactivate: function() {
    this.controllerFor('application').set('modalMode', false);
  }
});
