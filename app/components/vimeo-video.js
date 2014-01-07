// http://vimeo.com/76153146

import MediaBaseComponent from 'appkit/components/media_base';

function player(action, value) {
  var data = { method: action };
  if (value) { data.value = value; }
  contentWindow.postMessage(JSON.stringify(data), url);
}

var url, contentWindow, listener,
    VIMEO_HOST = window.location.protocol + "//player.vimeo.com",
    endpoint = 'http://player.vimeo.com/video/EXTERNAL_ID?api=1';

export default MediaBaseComponent.extend({
  elementId: 'vimeo-video',

  player: function() { return this; }.property(),

  src: function() {
    return endpoint.replace('EXTERNAL_ID', this.get('media.externalId'));
  }.property('media.externalId'),

  apiSetup: function() {
    window.addEventListener('message', this.onMessage(this), false);
  },

  onMessage: function(self) {
    return listener = function(evt) {
      if (evt.origin !== VIMEO_HOST) { return; }
      var data = JSON.parse(evt.data);

      if (data.event) {
        return self[data.event + 'Event'](data.data);
      }
    };
  },

  readyEvent: function(data) {
    var iframe = this.$();
    url = iframe.attr('src').split('?')[0];
    contentWindow = iframe[0].contentWindow;
    player('addEventListener', 'playProgress');
    player('addEventListener', 'play');
  },

  playEvent: function(data) {
    var start = this.get('media.start');
    if (start > 1) { this._seekTo(start); }  // first play
    this.playEvent = Ember.K;
  },

  playProgressEvent: function(data) {
    this.set('time', data.seconds);
  },

  playerPlay: function() {
    player('play');
  },

  seekTo: function(seconds) {
    if (seconds === 0) { seconds = 0.01; }  // vimeo doesn't accept 0
    player('seekTo', seconds);
  },

  pause: function() {
    player('pause');
  },

  willDestroyElement: function() {
    this._super();
    window.removeEventListener('message', listener);
  }
});
