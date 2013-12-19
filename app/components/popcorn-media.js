/* jshint newcap: false */

function round(num) {
  return Math.round(num*10) / 10;
}

export default Ember.Component.extend({
  media: null,
  currentTime: 0,
  mediaPlayer: null,
  popcorn: null,
  start: 0,

  // src: Em.computed.alias('media.url'),
  src: 'https://soundcloud.com/armadamusic/armin-van-buuren-shivers',
  elementCTOR: Popcorn.HTMLSoundCloudAudioElement,

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
    this.set('mediaPlayer', popcorn);

    this.setEventHandlers();
    this.didInsertElementHook();
  },

  setEventHandlers: function() {
    var popcorn = this.get('popcorn'),
        self = this;

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
  },

  didInsertElementHook: Ember.K
});
