import PresentationController from 'appkit/controllers/presentation';

var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default PresentationController.extend({
  activeTab: 'slides',
  editMode: true,
  showSeconds: true,
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
      this.get('video.proxy').setKeys();
    },

    changePresentationMode: function(value) {
      this.set('presentationMode', value);
    },

    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    addSequence: function() {
      var slide = this.get('slide'),

          seq = this.store.createRecord('sequence', {
            start: this.get('controllers.video').getCurrentTime(),
            slide: slide
          });

      this.pushObject(seq);
      this.set('slide', slide + 1);
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

    addTestingUrls: function() {
      var deckProxy = this.get('deck.proxy'),
          videoProxy = this.get('video.proxy');

      deckProxy.set('url', "https://speakerdeck.com/jrallison/ember-components");
      deckProxy.setKeys();

      videoProxy.set('url', "http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451");
      videoProxy.setKeys();
    }
  }
});
