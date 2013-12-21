/* jshint newcap: false */

import PopcornMediaComponent from 'appkit/components/popcorn-media';

export default PopcornMediaComponent.extend({
  elementCTOR: Popcorn.HTMLYouTubeVideoElement,

  src: function() {
    var url = this.get('media.url'),
        split = url.split('#t='),
        start = this.get('media.start') || split[1] || 0;

    this.set('start', start);
    return split[0] + '&controls=2';
  }.property('media.url'),

  didInsertElementHook: function() {
    var count = 0,
        start = this.get('start'),
        popcorn = this.get('popcorn');

    // Youtube hack - prevent needing to click play twice
    // needed to hack popcorn to return the YT player
    var fixFirstPlay = window.setInterval(function() {
      var player = popcorn.media.__player;

      count++;
      if (count > 40) { window.clearInterval(fixFirstPlay); }
      else if (player && player.playVideo) {
        popcorn.play(start);
        player.playVideo();
        player.pauseVideo();
        window.clearInterval(fixFirstPlay);
      }
    }, 100);
  }
});
