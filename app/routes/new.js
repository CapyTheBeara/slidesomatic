import PresentationRoute from 'appkit/routes/presentation';

export default PresentationRoute.extend({
  name: 'new',

  model: function(params, queryParams) {
    if (queryParams.seq) {
      return this._super.apply(this, arguments);
    }

    return this.store.createRecord('presentation', {
      deck: this.store.createRecord('deck'),
      video: this.store.createRecord('video')
    });
  },

  setupController: function(controller, presentation) {
    this._super.apply(this, arguments);
    this.controllerFor('application').set('modalMode', true);
    this.controllerFor('video').set('editMode', true);
  },

  deactivate: function() {
    this.controllerFor('application').set('modalMode', false);
  }
});
