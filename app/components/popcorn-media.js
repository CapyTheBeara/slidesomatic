/* jshint newcap: false */

function round(num) {
  return Math.round(num*10) / 10;
}

export default Ember.Component.extend({
  media: null,
  start: 0,
  src: Em.computed.alias('media.url'),
  elementCTOR: Popcorn.HTMLSoundCloudAudioElement,
  timeBinding: 'playback.time',
  popcorn: Em.computed.alias('playback.mediaPlayer'),

  element: function() {
    var id = "#" + this.get('elementId'),
        el = this.get('elementCTOR')(id);

    el.src = this.get('src');
    el.width = "100%";
    el.height = "100%";
    el.controls = true;
    return el;
  }.property('src'),

  didInsertElement: function() {
    var popcorn = Popcorn(this.get('element'));
    this.set('popcorn', popcorn);

    this.setEventHandlers();
    this.didInsertElementHook();
  },

  setEventHandlers: function() {
    var popcorn = this.get('popcorn'),
        self = this;

    popcorn.on('timeupdate', function(evt){
      var last = self.get('time'),
          current = round(popcorn.currentTime());

      if (last !== current) {
        self.set('time', current);
      }
    });

    popcorn.on('seeked', function(evt) {
      var time = round(popcorn.currentTime());
      self.set('time', time);
    });

    popcorn.on('error', function(evt) {
      console.log('popcorn error:', evt);
    });
  },

  didInsertElementHook: Ember.K
});
