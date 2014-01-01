import Playback from 'appkit/utils/playback';

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
    this.get('playback').reset();

    controller.setProperties({
      model: presentation.get('sequences'),
      presentation: presentation,
      playback: this.get('playback')
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
  },

  deactivate: function() {
    // still need a playback if leaving the page while controller
    // is trying to set a property on playback
    // Otherwise will get error and break transition
    this.controllerFor(this.get('name')).set('playback', Playback.create());
  }
});
