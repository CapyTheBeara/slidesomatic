var props = {
  time: 0,
  slide: 1,
  nextSlide: 2,
  mediaPlayer: null,
  site: null,
  sitemode: false
};

var Playback = Ember.Object.extend(props);

Playback.reopen({
  reset: function() {
    this.setProperties(props);
  },

  siteDidChange: function() {
    console.log(this.get('site'));
  }.observes('site')
});

export default Playback;
