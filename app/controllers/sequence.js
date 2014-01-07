export default Ember.ObjectController.extend({
  currentSequence: Em.computed.alias('parentController.currentSequence'),
  editMode: Em.computed.alias('parentController.editMode'),

  isPast: function(time, type) {
    var past = this.get('start') <= time;
    if (!type) { return past; }
    return past && this.get('content').isA(type);
  },

  isPastSequence: function() {
    return this.get('start') < this.get('currentSequence.start');
  }.property('currentSequence'),

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  },

  actions: {
    destroy: function() {
      if (confirm('Remove this time point?')) {
        this.get('parentController').removeObject(this.get('content'));
      }
    }
  }
});
