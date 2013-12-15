export default Ember.ObjectController.extend({
  time: null,
  currentSequence: null,
  deckView: null,
  deckPlayer: null,
  videoPlayer: null,
  needs: ['sequences'],

  updateSequence: function() {
    var deckPlayer, slide,
        time = this.get('time'),
        currentSequence = this.get('currentSequence'),
        seqs = this.get('sequences'),

        hit = seqs.filter(function(seq) {
          if (seq.hasPassed(time)) { return true; }
        }).get('lastObject');

    if (!hit) { return false; }
    if (!currentSequence || !currentSequence.eq(hit)) {
      this.set('currentSequence', hit);
    }
  }.observes('time'),

  updateSlide: function() {
    var deckPlayer = this.get('deckPlayer'),
        slide = parseInt(this.get('currentSequence.slide'), 10);

    if (deckPlayer) {
      deckPlayer.jumpTo(slide);
    }
  }.observes('currentSequence'),

  actions: {
    setTime: function(time) {
      this.set('time', time);
    },

    skipTo: function(time) {
      this.get('videoPlayer').play(time);
    }
  }
});
