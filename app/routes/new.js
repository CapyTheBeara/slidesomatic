import PresentationRoute from 'appkit/routes/presentation';

export default PresentationRoute.extend({
  name: 'new',

  model: function(params, queryParams) {
    if (queryParams.s && queryParams.m && queryParams.d) {
      return this._super.apply(this, arguments);
    }

    var deckArgs = queryParams.d ? {url: queryParams.d} : {},
        mediaArgs = queryParams.m ? {url: queryParams.m} : {};

    return this.store.createRecord('presentation', {
      deck: this.store.createRecord('deck', deckArgs),
      media: this.store.createRecord('media', mediaArgs)
    });
  },

  setupController: function(controller, presentation) {
    this._super.apply(this, arguments);
    this.controllerFor('application').set('modalMode', true);
    this.controllerFor('media').set('editMode', true);

    if (presentation.get('deck.url')) {
      controller.send('submitUrls');
    }
  },

  deactivate: function() {
    this.controllerFor('new').set('playback', null);
    this.controllerFor('application').set('modalMode', false);
    this.controllerFor('media').setProperties({
      playback: null,
      editMode: false
    });
  }
});
