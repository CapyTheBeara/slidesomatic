export default Ember.Route.extend({
  name: 'presentation',

  model: function(params, queryParams) {
    var presentation = this.store.createRecord('presentation', {
          encodedSequencesUrlFrag: queryParams.seq
        }),

        deck = this.store.createRecord('deck', {
          deckId: queryParams.did
        }),

        video = this.store.createRecord(queryParams.vtype + '_video', {
          start: presentation.get('firstSequence.start'),  // needs to be before videoId
          videoId: queryParams.vid
        });

    presentation.setProperties({ deck: deck, video: video });
    return presentation;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('controllers.sequences.editMode', false);
  },

  renderTemplate: function(controller, model) {
    var sequencesController = this.controllerFor('sequences');

    sequencesController.setProperties({
      'presentation': model,
      'model': model.get('sequences')
    });

    this._super();

    this.render('sequence/index', {
      outlet: 'sequences',
      into: this.get('name'),
      controller: sequencesController
    });
  },

  actions: {
    skipTo: function(time) {
      this.controllerFor(this.get('name')).send('skipTo', time);
    }
  }
});
