import PresentationController from 'appkit/controllers/presentation';

function domainName(url) {
  var match = url.match(/^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/);
  return match && match[1];
}

function round(num) {
  return Math.round(num*10) / 10;
}

var validationMsg = {
  pending: 'Fetching...',
  valid: 'Got it!',
  notFound: "Couldn't find that. Is the address correct?",
  requestError: 'There was a problem contacting that site. Please try again later.'
};

export default PresentationController.extend({
  videoUrl: 'http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451',
  deckUrl: 'https://speakerdeck.com/jrallison/ember-components', // null,
  newSequence: null,
  validUrls: Em.computed.and('deck.valid', 'video.valid'),
  urlError: null,
  sequencePresent: Em.computed.bool('firstSequence'),
  needs: ['application'],
  deckView: null,
  activeTab: 'video',

  // TODO move to component
  deckValidationMsg: function() {
    return this.validationMsg('deck');
  }.property('deck.validationState'),

  // TODO implemnt validation msg in video models
  videoValidationMsg: function() {
    return this.validationMsg('video');
  }.property('video.validationState'),

  validationMsg: function(type) {
    var state = this.get(type + '.validationState');
    if (!state) { return; }
    return validationMsg[state];
  },

  toggleModal: function() {
    if (this.get('validUrls')) {
      this.set('controllers.application.modalMode', false);
    }
  }.observes('validUrls'),

  addChild: function(type) {
    var domain, modelName, model,
        url = this.get(type + 'Url'),
        deckUrl = this.get('deck.url');

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

    setDeckView: function(view) {
      this.set('deckView', view);
    },

    deckViewError: function(msg) {
// TODO handle error
    },

    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    setSequenceTime: function() {
      var start = this.getCurrentTime();
      this.set('newSequence.start', start);
    },

    addSequence: function() {
      var seq = this.get('newSequence'),
          model = this.get('model'),
          nextSeq = this.store.createRecord('sequence', {
            slide: seq.get('slide')
          });

      seq.set('start', this.getCurrentTime());
      seq.set('slide', this.getCurrentSlide());

      model.get('sequences').pushObject(seq);
      this.set('newSequence', nextSeq);
      this.get('deckPlayer').next();
    },

    scrubVideo: function(change) {
      var time = this.getCurrentTime(),
          player = this.get('videoPlayer');

      this.set('time', time);
      player.currentTime(round(time + change/5));
    }
  }
});
