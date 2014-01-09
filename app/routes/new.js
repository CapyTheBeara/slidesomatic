import PresentationRoute from 'appkit/routes/presentation';

export default PresentationRoute.extend({
  name: 'new',

  model: function(params, queryParams) {
    if (queryParams.s && queryParams.m && queryParams.d) {
      return this._super.apply(this, arguments);
    }

    var deckArgs = queryParams.d ? {url: queryParams.d} : {},
        mediaArgs = queryParams.m ? {url: queryParams.m} : {};

    var pres = this.store.createRecord('presentation', {
      deck: this.store.createRecord('deck', deckArgs),
      media: this.store.createRecord('media', mediaArgs)
    });

    // pres.get('sequences').pushObject(
    //   this.store.createRecord('sequence', {
    //     start: 0,
    //     slide: 1
    //   })
    // );

    return pres;
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('presentationMode', false);
    this.controllerFor('application').set('modalMode', true);
    this.controllerFor('sequences').set('editMode', true);

    if (model.get('deck.url')) {
      controller.send('submitUrls');
    }
  }
});
