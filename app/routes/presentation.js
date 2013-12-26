export default Ember.Route.extend({
  name: 'presentation',

  model: function(params, queryParams) {
    if (!queryParams.m || !queryParams.d) {
      return this.transitionTo('new', { queryParams: queryParams });
    }

    var args = queryParams.s ? {sequencesUrlFrag: queryParams.s} : {},
        presentation = this.store.createRecord('presentation', args),

        deck = this.store.createRecord('deck', {
          routeId: queryParams.d
        }),

        media = this.store.createRecord('media', {
          start: presentation.get('firstSequence.start') || 0,
          routeId: queryParams.m
        });

    deck.validate();
    media.validate();
    presentation.setProperties({ deck: deck, media: media });
    return presentation;
  },

  setupController: function(controller, presentation) {
    controller.setProperties({
      model: presentation.get('sequences'),
      presentation: presentation
    });

    this.controllerFor('application').set('wrapperClass', this.get('name'));
  },

  renderTemplate: function(controller, presentation) {
    var mediaController = this.controllerFor('media'),
        deckController = this.controllerFor('deck');

    mediaController.set('content', presentation.get('media'));
    deckController.set('content', presentation.get('deck'));

    this.render();

    this.render('media', {
      into: this.get('name'),
      outlet: 'media',
      controller: mediaController
    });

    this.render('deck', {
      into: this.get('name'),
      outlet: 'deck',
      controller: deckController
    });
  }
});
