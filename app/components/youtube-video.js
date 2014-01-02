/* global YT */
// https://developers.google.com/youtube/iframe_api_reference

import MediaBaseComponent from 'appkit/components/media_base';

var STATE, pollInterval,
    clearInterval = window.clearInterval,
    domain = window.location.protocol === "file:" ? "*" :
        window.location.protocol + "//" + window.location.host,
    endpoint = "http://www.youtube.com/embed/EXTERNAL_ID?enablejsapi=1&start=START&showinfo=0&autohide=1&origin=" + domain;

export default MediaBaseComponent.extend({
  elementId: 'youtube-video',
  apiScript: 'https://www.youtube.com/iframe_api',
  playerState: null,
  playerReady: false,
  playerError: null,
  checkApiReady: function() { return YT; },

  src: function() {
    return endpoint.replace('EXTERNAL_ID', this.get('media.externalId'))
                   .replace('START', this.get('media.start') || 0);
  }.property('media.externalId', 'media.start'),

  apiSetup: function() {
    var self = this;

    window.onYouTubeIframeAPIReady = function() {
      self.get('player');

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

  player: function() {
    return new YT.Player(this.get('elementId'), {
      events: {
        onReady: this.onPlayerReady(this),
        onStateChange: this.onPlayerStateChange(this),
        onError: this.onError(this)
      }
    });
  }.property(),

  // TODO don't allow user input until player is ready
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

  _getTime: function() {
    return this.get('player').getCurrentTime();
  },

  _seekTo: function(seconds) {
    this.get('player').seekTo(seconds);
  },

  _play: function() {
    this.get('player').playVideo();
  },

  playerStateDidChange: function() {
    var state = this.get('playerState'),
        poll = this._updateTime(this);

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

  willDestroyElement: function() {
    this._super();
    clearInterval(pollInterval);
    this.get('player').destroy();
  }
});
