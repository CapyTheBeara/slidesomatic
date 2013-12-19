export default Ember.Route.extend({
  name: 'presentation',

  model: function(params, queryParams) {
    if (queryParams.seq) {
      var presentation = this.store.createRecord('presentation', {
            sequencesUrlFrag: queryParams.seq
          }),

          deck = this.store.createRecord('deck', {
            url: queryParams.deck
          }),

          video = this.store.createRecord('video', {
            start: presentation.get('firstSequence.start'),
            url: queryParams.video
          });

      deck.validate();
      video.validate();
      presentation.setProperties({ deck: deck, video: video });
      return presentation;
    }
  },

  setupController: function(controller, presentation) {
    controller.set('model', presentation.get('sequences'));
    controller.set('presentation', presentation);
    this.controllerFor('sequence').set('parentController', controller);
    this.controllerFor('application').set('wrapperClass', this.get('name'));
  },

  renderTemplate: function(controller, presentation) {
    var videoController = this.controllerFor('video'),
        deckController = this.controllerFor('deck');

    videoController.set('video', presentation.get('video'));
    deckController.set('content', presentation.get('deck'));

    this.render();

    this.render('video', {
      into: this.get('name'),
      outlet: 'video',
      controller: videoController
    });

    this.render('deck', {
      into: this.get('name'),
      outlet: 'deck',
      controller: deckController
    });
  }
});
