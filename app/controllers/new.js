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
  maxSeqs: function() {
    var base = this.get('presentation.url').split('&s=')[0];
    return Math.floor((2000 - base.length) / 5);
  }.property(),

  toggleModal: function() {
    if (this.get('validUrls')) {
      this.set('controllers.application.modalMode', false);
    }
  }.observes('validUrls'),

  _addSequence: function(slide) {
    var seq, start,
        mediaController = this.get('controllers.media'),
        currentTime = mediaController.getCurrentTime(),
        startExists = this.findBy('start', currentTime);

    if (startExists) {
      alert("Sorry, you can't have a slide or full screen mode set at the same time. Please set a different time.");
      return;
    }

    seq = this.store.createRecord('sequence', {
      start: currentTime,
      slide: slide
    });

    this.pushObject(seq);
    mediaController.resetScrubbers();
    return true;
  },


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

    addSequence: function() {
      if (this._addSequence(this.get('playback.slide'))) {
        this.set('playback.slide', this.get('slide') + 1);
      }
    },

    toggleFullVideo: function() {
      if (!this.get('fullVideo')) {
        this._addSequence(4094);
      } else {
        this._addSequence(4095);
      }
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
      // media.set('url', 'http://vimeo.com/76153146');
      deck.validate();
      media.validate();
    }
  }
});
