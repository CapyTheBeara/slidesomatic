/* global SC */
// https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites

import MediaBaseComponent from 'appkit/components/media_base';

var endpoint = 'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/EXTERNAL_ID&show_artwork=false&buying=false&liking=false&download=false&sharing=false&show_comments=false&show_playcount=false&show_user=false';

export default MediaBaseComponent.extend({
  elementId: 'soundcloud-audio',
  apiScript: '//w.soundcloud.com/player/api.js',
  checkApiReady: function() { return SC; },

  src: function() {
    return endpoint.replace('EXTERNAL_ID', this.get('media.externalId'));
  }.property('media.externalId'),

  player: function() {
    var player = SC.Widget(this.get('elementId')),
        self = this;

    player.bind(SC.Widget.Events.PLAY_PROGRESS, function(obj) {
      self.set('time', obj.currentPosition / 1000);
    });

    return player;
  }.property(),

  playerPlay: function() {
    this.get('player').play();
  },

  seekTo: function(seconds) {
    this.get('player').seekTo(seconds * 1000);
  },

  pause: function() {
    this.get('player').pause();
  },

  willDestroyElement: function() {
    this._super();
    this.get('player').unbind(SC.Widget.Events.PLAY_PROGRESS);
  }
});
