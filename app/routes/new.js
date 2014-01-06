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

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('modalMode', true);

    this.controllerFor('media').setProperties({
      presentationMode: false
    });

    this.controllerFor('deck').setProperties({
      presentationMode: false
    });

    this.controllerFor('sequences').setProperties({
      editMode: true
    });

    if (model.get('deck.url')) {
      controller.send('submitUrls');
    }
  }
});
