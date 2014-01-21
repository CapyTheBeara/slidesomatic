import FullVideoAnimation from 'appkit/utils/full_video_animation';
import sequenceFinder from 'appkit/controllers/utils/sequence_finder';

function round(num) {
  return Math.round(num*10) / 10;
}

var equal = Em.computed.equal;

export default Ember.ObjectController.extend({
  youtube: equal('domainRoot', 'youtube'),
  soundcloud: equal('domainRoot', 'soundcloud'),
  vimeo: equal('domainRoot', 'vimeo'),

  needs: ['sequences'],
  sequences: Em.computed.alias('controllers.sequences'),
  time: 0,
  player: null,
  animation: null,
  presentationModeBinding: 'playback.presentationMode',

  editMode: false,  // set in route

  pauseMode: false,
  findPauseMode: sequenceFinder('pause').observes('time'),

  videoMode: false,
  blockedVideoSeq: null,
  currentVideoSeq: null,

  findVideoMode: sequenceFinder('video', function(self, seq) {
    self.set('currentVideoSeq', seq);
    var blocked = self.get('blockedVideoSeq');

    if (blocked && blocked.eq(seq)) { return false; }
    return true;
  }).observes('time'),

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

  pauseModeDidChange: function() {
    if (!this.get('presentationMode')) { return; }

    if (this.get('pauseMode')) { this.get('player').pause(); }
  }.observes('pauseMode'),

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
    },

    fullVideoOff: function() {
      var blocked = this.get('currentVideoSeq'),
          oldBlocked = this.get('blockedVideoSeq');

      blocked.set('disabled', true);
      if (oldBlocked) { oldBlocked.set('disabled', false); }

      this.setProperties({
        videoMode: false,
        blockedVideoSeq: blocked
      });
    }
  }
});
