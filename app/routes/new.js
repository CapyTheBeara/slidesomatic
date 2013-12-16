import PresentationRoute from 'appkit/routes/presentation';

export default PresentationRoute.extend({
  name: 'new',

  model: function(params, queryParams) {
    if (queryParams.seq) {
      return this._super(params, queryParams);
    }

    var deck = this.store.createRecord('deck'),
        video = this.store.createRecord('video');

    return this.store.createRecord('presentation', {
      deck: deck,
      video: video
    });
  },

  setupController: function(controller, model, queryParams) {
    this._super(controller, model);

    controller.set('newSequence', this.store.createRecord('sequence'));
    controller.set('controllers.sequences.showSeconds', true);
    controller.set('controllers.sequences.editMode', true);
    controller.set('controllers.application.modalMode', true);

    if (queryParams.seq) {
      controller.set('videoUrl', model.get('video.url'));
      controller.set('deckUrl', model.get('deck.url'));
    }
  },

  deactivate: function() {
    this.controller.set('controllers.application.modalMode', false);
  },

  actions: {
    addSequence: function() {
      var newController = this.controllerFor('new'),
          sequencesController = this.controllerFor('sequences'),
          seq = newController.get('newSequence'),
          nextSeq = this.store.createRecord('sequence');

      seq.set('start', newController.getCurrentTime());
      seq.set('slide', newController.getCurrentSlide());

      sequencesController.pushObject(seq);
      newController.set('newSequence', nextSeq);
      newController.get('deckPlayer').next();
    }
  }
});
