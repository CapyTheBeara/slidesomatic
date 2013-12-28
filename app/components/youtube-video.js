/* global YT */
// https://developers.google.com/youtube/iframe_api_reference

function loadPlayerAPI() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


var STATE, pollInterval,
    apiReady = false,
    clearInterval = window.clearInterval,
    domain = window.location.protocol === "file:" ? "*" :
        window.location.protocol + "//" + window.location.host,
    endpoint = "http://www.youtube.com/embed/EXTERNAL_ID?enablejsapi=1&start=START&origin=" + domain;

export default Ember.Component.extend({
  tagName: 'iframe',
  elementId: 'youtube-player',
  attributeBindings: ['type', 'width', 'height', 'src'],
  type: 'text/html',
  width: 640,
  height: 390,
  media: null,
  player: null,
  playerState: null,
  playerReady: false,
  playerError: null,
  timeBinding: 'playback.time',
  elementInserted: false,

  src: function() {
    return endpoint.replace('EXTERNAL_ID', this.get('media.externalId'))
                   .replace('START', this.get('media.start') || 0);
  }.property('url'),

  init: function() {
    var self = this;
    this._super();
    loadPlayerAPI();

    window.onYouTubeIframeAPIReady = function() {
      apiReady = true;
      self.setPlayer();

      STATE = {
        unstarted: -1,
        ended: YT.PlayerState.ENDED,  // 0
        playing: YT.PlayerState.PLAYING,  // 1
        paused: YT.PlayerState.PAUSED,  // 2
        buffering: YT.PlayerState.BUFFERING,  // 3
        cued: YT.PlayerState.CUED  // 5
      };
    };
  },

  setPlayer: function() {
    if (!apiReady || !this.get('elementInserted')) { return; }

    this.set('player', new YT.Player(this.get('elementId'), {
        events: {
          onReady: this.onPlayerReady(this),
          onStateChange: this.onPlayerStateChange(this),
          onError: this.onError(this)
        }
      })
    );

    this.set('playback.mediaPlayer', this);
  }.observes('elementInserted'),

  onPlayerReady: function(self) {
    return function(evt) {
      self.set('playerReady', true);
    };
  },

  onPlayerStateChange: function(self) {
    return function(evt) {
      self.set('playerState', evt.data);
    };
  },

  onError: function(self) {
    return function(evt) {
      self.set('playerError', evt.data);
    };
  },

  currentTime: function(seconds) {
    var player = this.get('player');
    if (!seconds) { return player.getCurrentTime(); }
    player.seekTo(seconds);
  },

  play: function(seconds) {
    var player = this.get('player');
    if (seconds) { player.seekTo(seconds); }
    player.playVideo();
  },

  playerStateDidChange: function() {
    var state = this.get('playerState'),
        poll = this._updateTime(this);
console.log(state);
    if (state === STATE.playing) {
      pollInterval = window.setInterval(poll, 250);
    }
    else { clearInterval(pollInterval); }
  }.observes('playerState'),

  _updateTime: function(self) {
    return function() {
      self.set('time', self.currentTime());
    };
  },

  didInsertElement: function() {
    this.set('elementInserted', true);
  },

  willDestroyElement: function() {
    clearInterval(pollInterval);
    this.get('player').destroy();
    this.set('elementInserted', false);
  }
});
