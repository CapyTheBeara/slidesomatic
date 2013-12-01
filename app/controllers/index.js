export default Ember.ObjectController.extend({
  time: null,
  currentSequence: null,

  actions: {
    updateSequence: function(time) {
      this.set('time', time);

      var currentSequence = this.get('currentSequence'),
          seqs = this.get('sequences'),

          hit = seqs.find(function(seq) {
            if (seq.includesTime(time)) { return true; }
          });

      if (!hit) { return false; }
      if (!currentSequence || !currentSequence.eq(hit)) {
        this.set('currentSequence', hit);
      }
    }
  }
});
