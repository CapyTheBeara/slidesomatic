export default Ember.Mixin.create({
  valid: false,
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
