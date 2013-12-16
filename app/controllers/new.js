import PresentationController from 'appkit/controllers/presentation';

function round(num) {
  return Math.round(num*10) / 10;
}

export default PresentationController.extend({
  newSequence: null,
  validUrls: Em.computed.and('deck.valid', 'video.valid'),
  urlError: null,
  sequencePresent: Em.computed.bool('firstSequence'),
  needs: ['application'],
  activeTab: 'slides',
  presentationMode: false,

  TESTING: Em.computed.alias('Ember.FOO_TESTING'),

  updateSlide: function() {
    if (this.get('presentationMode')) {
      this._super();
    }
  }.observes('currentSequence'),

  toggleModal: function() {
    if (this.get('validUrls')) {
      this.set('controllers.application.modalMode', false);
    }
  }.observes('validUrls'),

  getCurrentTime: function() {
    return round(this.get('videoPlayer').currentTime());
  },

  getCurrentSlide: function() {
    return this.get('deckPlayer.slide');
  },

  actions: {
    addDeck: function() {
      this.get('deck.proxy').setKeys();
    },

    addVideo: function() {
      this.get('video.proxy').setKeys();
    },

    deckViewError: function(msg) {
// TODO handle error
    },

    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    scrubVideo: function(change) {
      var time = this.getCurrentTime(),
          player = this.get('videoPlayer');

      this.set('time', time);
      player.currentTime(round(time + change/5));
    },

    changePresentationMode: function(value) {
      this.set('presentationMode', value);
    },

    addTestingUrls: function() {
      var deckProxy = this.get('deck.proxy'),
          videoProxy = this.get('video.proxy');

      deckProxy.set('url', "http://www.slideshare.net/tboyt/presentation-27430110");
      deckProxy.setKeys();

      videoProxy.set('url', "http://www.youtube.com/watch?v=bzT0ezT-Jn8#t=3676");
      videoProxy.setKeys();
    }
  }
});
