/* jshint newcap: false */

export default Ember.Component.extend({
  src: "",
  currentTime: 0,

  didInsertElement: function() {
    var popcorn,
        self = this,
        srcInfo = parseSrc(this.get('src')),
        id = "#" + this.get('elementId'),
        video = Popcorn.HTMLYouTubeVideoElement(id),
        $el = $(id);

    video.src = srcInfo.src;
    video.width = $el.width();
    video.height = $el.height();
    video.play();

    popcorn = Popcorn(video);
    popcorn.currentTime(srcInfo.startTime);

    popcorn.on('timeupdate', function(evt){
      var last = self.get('currentTime');
      var current = Math.round(popcorn.currentTime()*10) / 10;
      if (last !== current) {
        self.set('currentTime', current);
        self.sendAction('action', current);
      }
    });
  }
});

function parseSrc(fullSrc) {
  var split = fullSrc.split('#t=');
  return {
    src: split[0] + '&controls=2',
    startTime: split[1] || 0
  };
}
