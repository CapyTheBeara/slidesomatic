import PresentationController from 'appkit/controllers/presentation';

function domainName(url) {
  var match = url.match(/www\.(.+)\./);
  return match && match[1];
}

export default PresentationController.extend({
  videoUrl: 'http://www.youtube.com/watch?v=bzT0ezT-Jn8#t=3676', // null,
  deckUrl: 'http://www.slideshare.net/tboyt/presentation-27430110', // null,
  newSequence: null,
  showSequence: Em.computed.and('deck.valid', 'video.valid'),
  urlError: null,

  actions: {
    addChild: function(type) {
      var url = this.get(type + 'Url'),
          domain = domainName(url);

      if (domain) {
        var modelName = type + '/' + domain;

        try {
          var model = this.store.createRecord(modelName, {url: url});

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
      var deckPlayer = this.get('deckPlayer'),
          videoPlayer = this.get('videoPlayer'),
          currentSlide = deckPlayer.getCurrentSlide(),
          currentTime = Math.round(videoPlayer.currentTime() * 10)/10;

      this.set('newSequence.start', currentTime);
      this.set('newSequence.slide', currentSlide);
    },

    addSequence: function() {
      var seq = this.get('newSequence'),
          model = this.get('model'),
          nextSeq = this.store.createRecord('sequence', {
            slide: seq.get('slide') + 1
          });

      model.get('sequences').pushObject(seq);
      this.set('newSequence', nextSeq);
      this.get('deckPlayer').next();
    }
  }
});
