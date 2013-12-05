export default Ember.ObjectController.extend({
  time: null,
  currentSequence: null,
  videoPlayer: null,
  deckPlayer: null,
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
        slide = this.get('currentSequence.slide');

    if (slide === '1') {  // get rid of bouncing arrow
      deckPlayer.next();
      deckPlayer.previous();
    }

    deckPlayer.jumpTo(slide);
  }.observes('currentSequence'),

  actions: {
    setTime: function(time) {
      this.set('time', time);
    },
    setVideoPlayer: function(player) {
      this.set('videoPlayer', player);
    },

    setDeckPlayer: function(player) {
      this.set('deckPlayer', player);
    },

    skipTo: function(time) {
      this.get('videoPlayer').play(time);
    }
  }
});
