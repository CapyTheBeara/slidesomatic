import PresentationController from 'appkit/controllers/presentation';

var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default PresentationController.extend({
  activeTab: 'slides',
  presentationMode: false,
  needs: ['deck', 'video', 'application'],
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
      this.get('video').validate();
    },

    changePresentationMode: function(value) {
      this.set('presentationMode', value);
    },

    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    addSequence: function() {
      var slide = this.get('slide'),
          videoController = this.get('controllers.video'),

          seq = this.store.createRecord('sequence', {
            start: videoController.getCurrentTime(),
            slide: slide
          });

      this.pushObject(seq);
      this.set('slide', slide + 1);
      videoController.resetScrubbers();
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
          video = this.get('video');

      if (deck.get('url')) { deck.validate(); }
      if (video.get('url')) { video.validate(); }
    },

    addTestingUrls: function() {
      var deck = this.get('deck'),
          video = this.get('video');

      deck.set('url', "https://speakerdeck.com/jrallison/ember-components");
      // video.set('url', "http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451");
      video.set('url', "https://soundcloud.com/armadamusic/armin-van-buuren-shivers");

      deck.validate();
      video.validate();
    }
  }
});
