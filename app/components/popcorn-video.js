/* jshint newcap: false */

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
    video.width = $el.width();
    video.height = $el.height();

    popcorn = Popcorn(video);
    popcorn.currentTime(start);

    this.sendAction('setPlayer', popcorn);

    popcorn.on('timeupdate', function(evt){
      var last = self.get('currentTime'),
          current = Math.round(popcorn.currentTime()*10) / 10;

      if (last !== current) {
        self.set('currentTime', current);
        self.sendAction('action', current);
      }
    });
  }
});
