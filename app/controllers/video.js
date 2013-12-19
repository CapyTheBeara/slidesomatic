function round(num) {
  return Math.round(num*10) / 10;
}

var equal = Em.computed.equal;

export default Ember.ObjectController.extend({
  player: null,
  time: null,
  editMode: false,
  youtube: equal('domainRoot', 'youtube'),
  soundcloud: equal('domainRoot', 'soundcloud'),

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
