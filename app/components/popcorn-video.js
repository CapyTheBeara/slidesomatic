/* jshint newcap: false */

function round(num) {
  return Math.round(num*10) / 10;
}

export default Ember.Component.extend({
  video: null,
  currentTime: 0,
  videoPlayer: null,

  didInsertElement: function() {
    var popcorn,
        self = this,
        url = this.get('video.url'),
        split = url.split('#t='),
        src = split[0] + '&controls=2',
        start = this.get('video.start') || split[1] || 0,
        id = "#" + this.get('elementId'),
        video = Popcorn.HTMLYouTubeVideoElement(id),
        $el = $(id);

    video.src = src;
    video.width = "100%";
    video.height = "100%";

    popcorn = Popcorn(video);

    // hack - prevent needing to click play twice
    // needed to hack popcorn to return the YT player
    var fixFirstPlay = window.setInterval(function() {
      var player = popcorn.media.__player;

      if (player && player.playVideo) {
        popcorn.play(start);
        player.playVideo();
        player.pauseVideo();
        window.clearInterval(fixFirstPlay);
      }
    }, 100);

    popcorn.on('timeupdate', function(evt){
      var last = self.get('currentTime'),
          current = round(popcorn.currentTime());

      if (last !== current) {
        self.set('currentTime', current);
        self.sendAction('action', current);
      }
    });

    popcorn.on('seeked', function(evt) {
      var time = round(popcorn.currentTime());
      self.sendAction('action', time);
    });

    popcorn.on('error', function(evt) {
      console.log('popcorn error:', evt);
    });

    this.set('videoPlayer', popcorn);
  }
});
