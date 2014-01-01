var props = {
  time: 0,
  slide: 1,
  nextSlide: 2,
  mediaPlayer: null
};

var Playback = Ember.Object.extend(props);

Playback.reopen({
  reset: function() {
    this.setProperties(props);
  }
});

export default Playback;
