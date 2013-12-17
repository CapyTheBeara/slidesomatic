export default Ember.Route.extend({
  model: function(params, queryParams) {
    return this.store.createRecord('presentation', {
      deck: this.store.createRecord('deck', {
        url: 'https://speakerdeck.com/jrallison/ember-components'
      }),
      video: this.store.createRecord('video', {
        url: 'http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451'
      })
    });
  },

  setupController: function(controller, presentation) {
    controller.set('model', presentation.get('sequences'));
    controller.set('presentation', presentation);
  },

  deckController: function() {
    return this.controllerFor('deck');
  }.property(),

  videoController: function() {
    return this.controllerFor('video');
  }.property(),

  sequencesController: function() {
    return this.controllerFor('sequences');
  }.property(),


  renderTemplate: function(controller, presentation) {
    var videoController = this.get('videoController'),
        deckController = this.get('deckController');

    videoController.set('video', presentation.get('video'));
    deckController.set('deck', presentation.get('deck'));

    this.render();

    this.render('video', {
      outlet: 'video',
      into: 'sequences',
      controller: videoController
    });

    this.render('deck', {
      outlet: 'deck',
      into: 'sequences',
      controller: deckController
    });
  }
});
