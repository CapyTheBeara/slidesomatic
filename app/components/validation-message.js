var validationMsg = {
  pending: 'Fetching',
  valid: 'Got it!',
  notFound: "Couldn't find that. Is the address correct?",
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
