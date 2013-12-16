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
      this.get('deck.proxy').set();
    },

    addVideo: function() {
      this.get('video.proxy').set();
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
    }
  }
});
