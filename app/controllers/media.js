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

  scrub: function(change) {
    var player = this.get('player'),
        time = this.getCurrentTime();

    player.currentTime(round(time + change));
  },

  actions: {
    setPlayer: function(player) {
      this.set('player', player);
    }
  }
});
