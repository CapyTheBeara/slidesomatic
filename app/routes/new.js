export default Ember.Route.extend({
  model: function(params, queryParams) {
    if (queryParams.seq) {
// TODO
    }

    return this.store.createRecord('presentation', {
      deck: this.store.createRecord('deck'),
      video: this.store.createRecord('video')
    });
  },

  setupController: function(controller, presentation) {
    controller.set('model', presentation.get('sequences'));
    controller.set('presentation', presentation);
    this.controllerFor('application').set('modalMode', true);
  },

  deactivate: function() {
    this.controllerFor('application').set('modalMode', false);
  },

  renderTemplate: function(controller, presentation) {
    var videoController = this.controllerFor('video'),
        deckController = this.controllerFor('deck');

    videoController.set('video', presentation.get('video'));
    deckController.set('deck', presentation.get('deck'));

    this.render();

    this.render('video', {
      into: 'new',
      outlet: 'video',
      controller: videoController
    });

    this.render('deck', {
      into: 'new',
      outlet: 'deck',
      controller: deckController
    });
  }
});
