export default Ember.ObjectController.extend({
  currentSequence: Em.computed.alias('parentController.currentSequence'),
  presentationMode: Em.computed.alias('parentController.presentationMode'),

  isPast: function() {
    return this.get('start') < this.get('currentSequence.start');
  }.property('currentSequence'),

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  },

  actions: {
    destroy: function() {
      if (confirm('Remove this sequence?')) {
        this.get('parentController').removeObject(this);
      }
    }
  }
});
