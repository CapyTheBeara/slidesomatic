import PresentationController from 'appkit/controllers/presentation';

var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default PresentationController.extend({
  // presentation set in route
  deck: Em.computed.alias('presentation.deck'),
  media: Em.computed.alias('presentation.media'),
  activeTab: 'slides',
  presentationMode: false,
  needs: ['deck', 'media', 'application'],
  shortUrl: null,

  toggleModal: function() {
    if (this.get('validUrls')) {
      this.set('controllers.application.modalMode', false);
    }
  }.observes('validUrls'),

  actions: {
    addDeck: function() {
      this.get('deck').validate();
    },

    addVideo: function() {
      this.get('media').validate();
    },

    changePresentationMode: function(value) {
      this.set('presentationMode', value);
    },

    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    addSequence: function() {
      var slide = this.get('playback.slide'),
          mediaController = this.get('controllers.media'),

          seq = this.store.createRecord('sequence', {
            start: mediaController.getCurrentTime(),
            slide: slide
          });

      this.pushObject(seq);
      this.set('playback.slide', slide + 1);
      mediaController.resetScrubbers();
    },

    shortenUrl: function() {
      if (confirm('Are you finished?\n(Shortened URLs should only be obtained once you have finished adding all of your slide sequences.)')) {
        var self = this,
            url = this.get('presentation.url'),
            opts = {
              url: isGdUrl.replace('TARGET_URL', encodeURIComponent(url)),
              dataType: 'jsonp'
            };

        $.ajax(opts).then(function(res) {
          self.set('shortUrl', res.shorturl);
        });
      }
    },

    submitUrls: function() {
      var deck = this.get('deck'),
          media = this.get('media');

      if (deck.get('url')) { deck.validate(); }
      if (media.get('url')) { media.validate(); }
    },

    addTestingUrls: function() {
      var deck = this.get('deck'),
          media = this.get('media');

      deck.set('url', "https://speakerdeck.com/jrallison/ember-components");
      media.set('url', "http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451");
      // media.set('url', "https://soundcloud.com/armadamusic/armin-van-buuren-shivers");

      deck.validate();
      media.validate();
    }
  }
});
