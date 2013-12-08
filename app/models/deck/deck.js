var attr = DS.attr;

export default DS.Model.extend({
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation'),

  valid: false,  // TODO move to mixin. add to videos
  validationState: null, // 'pending', 'notFound', 'requestError', 'valid'

  setValid: function() {
    this.set('validationState', 'valid');
    this.set('valid', true);
  },

  setInvalid: function(state) {
    this.set('validationState', state);
    this.set('valid', false);
  }
});
