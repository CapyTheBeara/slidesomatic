export default Ember.ObjectController.extend({
  time: null,
  currentSequence: null,
  videoPlayer: null,
  slidePlayer: null,
  needs: ['sequences'],

  updateSlide: function() {
    var slidePlayer = this.get('slidePlayer'),
        slide = this.get('currentSequence.slide');

    if (slide === '1') {  // get rid of bouncing arrow
      slidePlayer.next();
      slidePlayer.previous();
    }

    slidePlayer.jumpTo(slide);
  }.observes('currentSequence'),

  actions: {
    setVideoPlayer: function(player) {
      this.set('videoPlayer', player);
    },

    setSlidePlayer: function(player) {
      this.set('slidePlayer', player);
    },

    skipTo: function(time) {
      this.get('videoPlayer').play(time);
    },

    toggleEdit: function() {
      this.toggleProperty('controllers.sequences.editMode');
    },

    updateSequence: function(time) {
      this.set('time', time);

      var slidePlayer, slide,
          currentSequence = this.get('currentSequence'),
          seqs = this.get('sequences'),

          hit = seqs.filter(function(seq) {
            if (seq.hasPassed(time)) { return true; }
          }).get('lastObject');

      if (!hit) { return false; }
      if (!currentSequence || !currentSequence.eq(hit)) {
        this.set('currentSequence', hit);
      }
    }
  }
});
