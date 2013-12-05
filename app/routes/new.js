import PresentationRoute from 'appkit/routes/presentation';

export default PresentationRoute.extend({
  name: 'new',

  model: function(params, queryParams) {
    if (queryParams.seq) {
      return this._super(params, queryParams);
    }

    return this.store.createRecord('presentation');
  },

  setupController: function(controller, model, queryParams) {
    this._super(controller, model);

    if (queryParams.seq) {
      controller.set('videoUrl', model.get('video.url'));
      controller.set('deckUrl', null);
    }
  }
});
