export default Ember.Component.extend({
  tagName: 'iframe',
  attributeBindings: ['src'],
  media: null,
  player: null,

  checkApiReady: Ember.K,
  playerPlay: Ember.K,
  seekTo: Ember.K,
  pause: Ember.K,

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
    this.sendAction('setPlayer', this);

    try {
      this.checkApiReady();
      this.get('player');
    } catch (e) {}
  },

  currentTime: function(seconds) {
    if (seconds === undefined || seconds < 0) { return this._getTime(); }
    this.seekTo(seconds);
    this.set('time', seconds);
  },

  play: function(seconds) {
    if (seconds !== undefined) { this.seekTo(seconds); }
    this.playerPlay();
  },

  _getTime: function() {
    return this.get('time');
  }
});
