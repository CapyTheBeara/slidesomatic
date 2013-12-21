function round(num) {
  return Math.round(num*10) / 10;
}

var equal = Em.computed.equal;

export default Ember.ObjectController.extend({
  player: Em.computed.alias('playback.mediaPlayer'),
  editMode: false,
  youtube: equal('domainRoot', 'youtube'),
  soundcloud: equal('domainRoot', 'soundcloud'),
  scrubHighValue: 50,
  scrubMediumValue: 50,
  scrubLowValue: 50,

  getCurrentTime: function() {
    return round(this.get('player').currentTime());
  },

  skipTo: function(time, play) {
    var player = this.get('player');
    if (play) { player.play(time); }
    else { player.currentTime(time); }
  },

  resetScrubbers: function() {
    this.set('scrubHighValue', 50);
    this.set('scrubMediumValue', 50);
    this.set('scrubLowValue', 50);
    $('input[type=range]').first().focus();
  },

  actions: {
    scrubHigh: function(change) {
      var player = this.get('player'),
          time = this.getCurrentTime();

      player.currentTime(round(time + 5*change));
    },

    scrubMedium: function(change) {
      var player = this.get('player'),
          time = this.getCurrentTime();

      player.currentTime(round(time + change));
    },

    scrubLow: function(change) {
      var player = this.get('player'),
          time = this.getCurrentTime();

      player.currentTime(round(time + change/5));
    }
  }
});
