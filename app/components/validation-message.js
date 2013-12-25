var validationMsg = {
  pending: 'Fetching',
  valid: 'Got it!',
  invalidUrl: 'Is that a valid address?',
  notSupported: "That website isn't supported at the moment.",
  requestError: 'There was a problem contacting that site. Please try again later.'
};

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['validation-message'],
  validationState: null,

  validationMsg: function() {
    var state = this.get('validationState');
    if (!state) { return; }
    return validationMsg[state];
  }.property('validationState'),

  pending: function() {
    return this.get('validationState') === 'pending';
  }.property('validationState')
});
