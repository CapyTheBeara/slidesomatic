export default Ember.Route.extend({
  name: null,

  renderTemplate: function(controller, model) {
    var sequencesController = this.controllerFor('sequences');

    sequencesController.setProperties({
      'presentation': model,
      'model': model.get('sequences')
    });

    this._super();

    this.render('sequence/index', {
      outlet: 'sequences',
      into: this.get('name'),
      controller: sequencesController
    });
  },

  actions: {
    skipTo: function(time) {
      this.controllerFor(this.get('name')).send('skipTo', time);
    }
  }
});
