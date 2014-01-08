export default Ember.Route.extend({
  name: 'presentation',

  model: function(params, queryParams) {
    if (!queryParams.m || !queryParams.d) {
      return this.transitionTo('new', { queryParams: queryParams });
    }

    var args = {};
    if (queryParams.s) { args.sequencesUrlFrag = queryParams.s; }
    if (queryParams.u) { args.sitesFrag = queryParams.u; }

    var presentation = this.store.createRecord('presentation', args),

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

  setupController: function(controller, model) {
    var mediaController = this.controllerFor('media'),
        deckController = this.controllerFor('deck'),
        sequencesController = this.controllerFor('sequences');

    this._super(controller, model);

    controller.set('presentationMode', true);

    this.controllerFor('application').setProperties({
      modalMode: false,
      wrapperClass: this.get('name')
    });

    sequencesController.setProperties({
      content: model.get('sequences'),
      editMode: false
    });

    deckController.setProperties({
      content: model.get('deck'),
      sequences: sequencesController
    });

    mediaController.setProperties({
      content: model.get('media'),
      sequences: sequencesController
    });
  },

  renderTemplate: function(controller, model) {
    this.render();

    this.render('sequences', {
      into: this.get('name'),
      outlet: 'sequences',
      controller: this.controllerFor('sequences')
    });

    this.render('media', {
      into: this.get('name'),
      outlet: 'media',
      controller: this.controllerFor('media')
    });

    this.render('deck', {
      into: this.get('name'),
      outlet: 'deck',
      controller: this.controllerFor('deck')
    });
  }
});
