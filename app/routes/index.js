export default Ember.Route.extend({

  setupController: function() {
    this.controllerFor('application').set('wrapperClass', 'index');
  }
});
