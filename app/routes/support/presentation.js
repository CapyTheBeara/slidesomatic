export default Ember.Route.extend({
  presentationMode: null,
  editMode: null,

  model: function() {
    return this.store.createRecord('presentation');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      presentationMode: this.get('presentationMode'),
      deck: this.modelFor('deck'),
      media: this.modelFor('media')
    });

    this.controllerFor('application').setProperties({
      wrapperClass: this.get('routeName')
    });

    this.controllerFor('sequences').set('editMode', this.get('editMode'));
  }
});
