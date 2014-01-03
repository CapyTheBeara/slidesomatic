export default Ember.ObjectController.extend({
  currentSequence: Em.computed.alias('parentController.currentSequence'),
  presentationMode: Em.computed.alias('parentController.presentationMode'),

  isPastSequence: function() {
    return this.get('start') < this.get('currentSequence.start');
  }.property('currentSequence'),

  isPast: function(time) {
    return this.get('start') <= time;
  },

  isPastSite: function(time) {
    return this.get('isSite') && this.get('start') <= time;
  },

  isPastVideo: function(time) {
    return this.get('isVideo') && this.get('start') <= time;
  },

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  },

  actions: {
    destroy: function() {
      if (confirm('Remove this time point?')) {
        this.get('parentController').removeObject(this);
      }
    }
  }
});
