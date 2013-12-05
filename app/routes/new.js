import PresentationBaseRoute from 'appkit/routes/presentation_base';

export default PresentationBaseRoute.extend({
  name: 'new',

  model: function() {
    return this.store.createRecord('presentation');
  }
});
