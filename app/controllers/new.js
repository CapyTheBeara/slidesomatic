import PresentationController from 'appkit/controllers/presentation';

function domainName(url) {
  var match = url.match(/^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/);
  return match && match[1];
}

function round(num) {
  return Math.round(num*10) / 10;
}

export default PresentationController.extend({
  videoUrl: 'http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451',
  deckUrl: 'https://speakerdeck.com/jrallison/ember-components', // null,
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

  addChild: function(type) {
    var domain, modelName, model,
        url = this.get(type + 'Url'),
        deckUrl = this.get('deck.url');

    this.set('urlError', null);
    if (!url || url === deckUrl) { return; }

    domain = domainName(url);
    if (domain) {
      try {
        modelName = type + '/' + domain;
        model = this.store.createRecord(modelName, {url: url});

        this.set('urlError', null);
        this.set('model.' + type, model);

        if (type === 'video') {
          this.set('newSequence.start', model.get('start'));
        }
      } catch (e) {
        return this.set('urlError', 'Sorry, that website is not supported.');
      }
    } else {
      this.set('urlError', 'Invalid address.');
    }
  },

  getCurrentTime: function() {
    return round(this.get('videoPlayer').currentTime());
  },

  getCurrentSlide: function() {
    return this.get('deckPlayer.slide');
  },

  actions: {
    addDeck: function() {
      this.addChild('deck');
    },

    addVideo: function() {
      this.addChild('video');
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
