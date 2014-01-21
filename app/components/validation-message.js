var validationMsg = {
      valid: 'Got it!',
      invalidUrl: 'Is that a valid URL?',
      invalidId: 'Is that the correct address?',
      validationSkipped: 'Cannot validate this address. Please proceed. If it does not work, make sure that it is correct.',
      notSupported: "That website isn't supported at the moment.",
      requestError: 'There was a problem contacting that site. Please try again later.'
    },

    labelType = {
      pending: 'primary',
      valid: 'info',
      invalidUrl: 'danger',
      invalidId: 'danger',
      validationSkipped: 'warning',
      notSupported: 'primary',
      requestError: 'danger'
    };

export default Ember.Component.extend({
  validationState: null,

  labelType: function() {
    var state = this.get('validationState');
    return 'label-' + labelType[state];
  }.property('validationMsg'),

  validationMsg: function() {
    var state = this.get('validationState');
    return validationMsg[state];
  }.property('validationState'),

  pending: function() {
    return this.get('validationState') === 'pending';
  }.property('validationState')
});
