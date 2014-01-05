import FullVideoAnimation from 'appkit/utils/full_video_animation';

function round(num) {
  return Math.round(num*10) / 10;
}

var equal = Em.computed.equal;

export default Ember.ObjectController.extend({
  youtube: equal('domainRoot', 'youtube'),
  soundcloud: equal('domainRoot', 'soundcloud'),
  vimeo: equal('domainRoot', 'vimeo'),

  time: 0,
  scrubHighValue: 50,
  scrubMediumValue: 50,
  scrubLowValue: 50,
  videoMode: false,
  animation: null,

  // set/override these in route
  editMode: false,
  presentationMode: true,
  sequences: null,

  timeDidChange: function() {
    var time = this.get('time'),

        seq = this.get('sequences').filter(function(seq) {
          if (seq.isPastVideo(time)) { return true; }
        }).get('lastObject');

    if (seq && seq.get('isOn')) { this.set('videoMode', true); }
    else { this.set('videoMode', false); }
  }.observes('time'),

  videoModeDidChange: function() {
    if (!this.get('presentationMode')) { return; }

    if (this.get('videoMode')) {
      var anim = FullVideoAnimation.create({ selector: '#media-view' });
      this.set('animation', anim);
      anim.expand();
    } else {
      var _anim = this.get('animation');
      if (!_anim) { return; }
      _anim.contract();
    }
  }.observes('videoMode'),

  getCurrentTime: function() {
    return round(this.get('player').currentTime());
  },

  skipTo: function(time) {
    var player = this.get('player'),
        mode = this.get('presentationMode');

    if (mode) { player.play(time); }
    else { player.currentTime(time); }
  },

  resetScrubbers: function() {
    this.set('scrubHighValue', 50);
    this.set('scrubMediumValue', 50);
    this.set('scrubLowValue', 50);
    $('input[type=range]').first().focus();
  },

  scrub: function(change, magnitude) {
    var player = this.get('player'),
        time = this.getCurrentTime();

    player.currentTime(round(time + magnitude*change));
  },

  actions: {
    setPlayer: function(player) {
      this.set('player', player);
    },

    scrubHigh: function(change) {
      this.scrub(change, 5);
    },

    scrubMedium: function(change) {
      this.scrub(change, 1);
    },

    scrubLow: function(change) {
      this.scrub(change, 1/5);
    }
  }
});
