function round(num) {
  return Math.round(num*10) / 10;
}

export default Ember.ObjectController.extend({
  video: null,
  player: null,
  time: null,

  getCurrentTime: function() {
    return round(this.get('player').currentTime());
  },

  actions: {
    setTime: function(time) {
      this.set('time', time);
    },

    scrub: function(change) {
      var player = this.get('player'),
          time = this.getCurrentTime();

      player.currentTime(round(time + change/5));
    }
  }
});
