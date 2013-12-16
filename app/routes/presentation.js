export default Ember.Route.extend({
  name: 'presentation',

  model: function(params, queryParams) {
    var presentation = this.store.createRecord('presentation', {
          sequencesUrlFrag: queryParams.seq
        }),

        deck = this.store.createRecord('deck/' + queryParams.dtype, {
          modelId: queryParams.did
        }),

        video = this.store.createRecord('video/' + queryParams.vtype, {
          start: presentation.get('firstSequence.start'),  // needs to be before modelId
          modelId: queryParams.vid
        });


    presentation.setProperties({ deck: deck, video: video });
    return presentation;
  },

  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    controller.set('controllers.sequences.showSeconds', false);
    controller.set('controllers.sequences.parent', controller);
  },

  renderTemplate: function(controller, model) {
    this._super.apply(this, arguments);

    var sequencesController = this.controllerFor('sequences');

    sequencesController.setProperties({
      'presentation': model,
      'model': model.get('sequences')
    });

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
