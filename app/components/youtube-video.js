/* global YT */
// https://developers.google.com/youtube/iframe_api_reference

function loadPlayerAPI() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


var STATE, poll, pollerInterval,
    domain = window.location.protocol === "file:" ? "*" :
        window.location.protocol + "//" + window.location.host;

export default Ember.Component.extend({
  tagName: 'iframe',
  elementId: 'youtube-video',
  attributeBindings: ['type', 'width', 'height', 'src'],
  type: 'text/html',
  width: 640,
  height: 390,
  src: "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=" + domain,
  player: null,
  playerState: null,
  time: 0,

  init: function() {
    var self = this;
    this._super();
    loadPlayerAPI();

    window.onYouTubeIframeAPIReady = function() {
      STATE = {
        unstarted: -1,
        ended: YT.PlayerState.ENDED,
        playing: YT.PlayerState.PLAYING,
        paused: YT.PlayerState.PAUSED,
        buffering: YT.PlayerState.BUFFERING,
        cued: YT.PlayerState.CUED
      };

      self.set('player', new YT.Player('youtube-video', {
          events: {
            onReady: self.onPlayerReady(self),
            onStateChange: self.onPlayerStateChange(self),
            onError: self.onError(self)
          }
        })
      );
    };
  },

  onPlayerReady: function(self) {
    return function() {

    };
  },

  onPlayerStateChange: function(self) {
    return function(evt) {
      var state = evt.data;
      self.set('playerState', state);
    };
  }.observes('playerState'),

  _getCurrentTime: function(self) {
    return function() {
      var time = self.get('player').getCurrentTime();
      self.set('time', time);
console.log(time);
    };
  },

  getCurrentTime: function() {
    return this._getCurrentTime(this)();
  },

  checkPlaying: function() {
    var state = this.get('playerState');
    poll = poll || this._getCurrentTime(this);

    if (state === STATE.playing) {
      pollerInterval = window.setInterval(poll, 250);
    } else {
      window.clearInterval(pollerInterval);
    }
  }.observes('playerState'),

  checkBuffering: function() {
    if (this.get('playerState') === STATE.buffering) {
      Ember.run.later(this, function() {
        this._getCurrentTime(this)();
      }, 250);  // hm... player takes some time to update
    }
  }.observes('playerState'),

  onError: function(self) {
    return function() {

    };
  }
});

