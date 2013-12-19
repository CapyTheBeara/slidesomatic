function round(num) {
  return Math.round(num*10) / 10;
}

export default Ember.Controller.extend({
  video: null,
  player: null,
  time: null,
  editMode: false,

  getCurrentTime: function() {
    return round(this.get('player').currentTime());
  },

  skipTo: function(time) {
    this.get('player').play(time);
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
