var alias = Em.computed.alias;

export default Ember.ObjectController.extend({
  currentSequence: alias('parentController.currentSequence'),
  editMode: alias('parentController.editMode'),

  isPast: function(time, type) {
    var past = this.get('start') <= time;
    if (!type) { return past; }
    return past && this.get('content').isA(type);
  },

  isPastSequence: function() {
    return this.get('start') < this.get('currentSequence.start');
  }.property('currentSequence'),

  eq: function(seq) {
    var content = this.get('content');
    return content && content.eq(seq);
  },

  actions: {
    destroy: function() {
      if (confirm('Remove this time point?')) {
        this.get('parentController').removeObject(this.get('content'));
      }
    }
  }
});
