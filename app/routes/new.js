import PresentationRoute from 'appkit/routes/presentation';

export default PresentationRoute.extend({
  name: 'new',

  model: function(params, queryParams) {
    if (queryParams.seq && queryParams.video && queryParams.deck) {
      return this._super.apply(this, arguments);
    }

    var deckArgs = queryParams.deck ? {url: queryParams.deck} : {},
        videoArgs = queryParams.video ? {url: queryParams.video} : {};

    return this.store.createRecord('presentation', {
      deck: this.store.createRecord('deck', deckArgs),
      video: this.store.createRecord('video', videoArgs)
    });
  },

  setupController: function(controller, presentation) {
    this._super.apply(this, arguments);
    this.controllerFor('application').set('modalMode', true);
    this.controllerFor('video').set('editMode', true);

    if (presentation.get('deck.url')) {
      controller.send('submitUrls');
    }
  },

  deactivate: function() {
    this.controllerFor('application').set('modalMode', false);
  }
});
