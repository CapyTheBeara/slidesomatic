import SequencesRoute from 'appkit/routes/sequences';

export default SequencesRoute.extend({
  parentRoute: 'edit',

  setupController: function(controller, model) {
    if (model.get('length')) {
      return this.controllerFor('sequences').set('content', model);
    }

    // model is a presentation passed via link-to
    this.controllerFor('sequences').set('content', model.get('sequences'));
  },

  serialize: function(presentation) {
    return { hash: presentation.get('encodedSequences') };
  }
});
