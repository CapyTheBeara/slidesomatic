export default Ember.Component.extend({
  tagName: 'iframe',
  attributeBindings: ['src'],
  media: null,
  timeBinding: 'playback.time',
  player: null,

  checkApiReady: Ember.K,
  _play: Ember.K,
  _seekTo: Ember.K,

  init: function() {
    this._super();
    var self = this,
        apiScript = this.get('apiScript');

    if (apiScript) {
      $.getScript(apiScript, function() {
        self.apiSetup();
      });
    } else {
      this.apiSetup();
    }
  },

  apiSetup: function() {
    this.get('player');
  },

  didInsertElement: function() {
    this.set('playback.mediaPlayer', this);

    try {
      this.checkApiReady();
      this.get('player');
    } catch (e) {}
  },

  currentTime: function(seconds) {
    if (seconds === undefined || seconds < 0) { return this._getTime(); }
    this._seekTo(seconds);
    this.set('time', seconds);
  },

  play: function(seconds) {
    if (seconds !== undefined) { this._seekTo(seconds); }
    this._play();
  },

  _getTime: function() {
    return this.get('time');
  }
});
