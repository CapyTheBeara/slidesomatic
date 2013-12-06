import PresentationController from 'appkit/controllers/presentation';

function domainName(url) {
  var match = url.match(/^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/);
  return match && match[1];
}

export default PresentationController.extend({
  videoUrl: 'http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451', // null,
  deckUrl: 'https://speakerdeck.com/jrallison/ember-components', // null,
  newSequence: null,
  showSequence: Em.computed.and('deck.valid', 'video.valid'),
  urlError: null,

  actions: {
    addChild: function(type) {
      var url = this.get(type + 'Url'),
          domain = domainName(url);

      if (domain) {
        try {
          var modelName = type + '/' + domain,
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
        this.set('urlError', 'Please input full URLs');
      }
    },

    setSequence: function() {
      var slide = this.get('deckPlayer').getCurrentSlide(),
          start = this.get('time');

      this.set('newSequence.start', start);
      this.set('newSequence.slide', slide);
    },

    addSequence: function() {
      var seq = this.get('newSequence'),
          model = this.get('model'),
          nextSeq = this.store.createRecord('sequence', {
            slide: seq.get('slide')
          });

      model.get('sequences').pushObject(seq);
      this.set('newSequence', nextSeq);
    },

    scrubVideo: function(change) {
      this.get('videoPlayer').currentTime(this.get('time') + change/5);
    }
  }
});
