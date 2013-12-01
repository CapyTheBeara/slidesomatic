export default Ember.ObjectController.extend({
  time: null,
  currentSequence: null,
  videoPlayer: null,
  slidePlayer: null,

  sequences: function() {
    return Em.ArrayProxy.createWithMixins(Em.SortableMixin, {
      sortProperties: ['start'],
      content: this.get('model.sequences')
    });
  }.property('model.sequences'),

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

    updateSequence: function(time) {
      this.set('time', time);

      var slidePlayer, slide,
          currentSequence = this.get('currentSequence'),
          seqs = this.get('sequences'),

          hit = seqs.filter(function(seq) {
            if (seq.hasPast(time)) { return true; }
          }).get('lastObject');

      if (!hit) { return false; }
      if (!currentSequence || !currentSequence.eq(hit)) {
        this.set('currentSequence', hit);

        slidePlayer = this.get('slidePlayer');
        slide = hit.get('slide');

        if (slide === '1') {  // get rid of bouncing arrow
          slidePlayer.next();
          slidePlayer.previous();
        }

        slidePlayer.jumpTo(slide);
      }
    }
  }
});
