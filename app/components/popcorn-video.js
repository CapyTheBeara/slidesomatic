/* jshint newcap: false */

function round(num) {
  return Math.round(num*10) / 10;
}

export default Ember.Component.extend({
  src: "",
  currentTime: 0,
  start: 0,

  didInsertElement: function() {
    var popcorn,
        self = this,
        src = this.get('src') + '&controls=2',
        start = this.get('start'),
        id = "#" + this.get('elementId'),
        video = Popcorn.HTMLYouTubeVideoElement(id),
        $el = $(id);

    video.src = src;
    video.width = "100%";
    video.height = "100%";

    popcorn = Popcorn(video);
    popcorn.currentTime(start);

    this.sendAction('setPlayer', popcorn);

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
  }
});
