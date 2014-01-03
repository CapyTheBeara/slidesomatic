import PresentationController from 'appkit/controllers/presentation';
import shortenUrl from 'appkit/utils/shorten_url';

export default PresentationController.extend({
  // presentation set in route
  deck: Em.computed.alias('presentation.deck'),
  media: Em.computed.alias('presentation.media'),
  activeTab: 'slides',
  presentationMode: false,
  needs: ['deck', 'media', 'application'],
  shortUrl: null,
  site: '',

  maxSeqs: function() {
    var base = this.get('presentation.url').replace(/&s=[^&]*/, '');
    return Math.floor((2000 - base.length) / 5);
  }.property('presentation.url'),

  toggleModal: function() {
    if (this.get('validUrls')) {
      this.set('controllers.application.modalMode', false);
    }
  }.observes('validUrls'),

  _addSequence: function(slide, site) {
    var seq, start, args,
        mediaController = this.get('controllers.media'),
        currentTime = mediaController.getCurrentTime(),
        startExists = this.findBy('start', currentTime);

    if (startExists) {
      alert("Sorry, you've already set this time. Please set a different time.");
      return;
    }

    args = { start: currentTime, slide: slide };
    if (site) { args.site = site; }

    seq = this.store.createRecord('sequence', args);
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

    addSite: function() {
      var url = this.get('site');
      // TODO validate url
      this._addSequence(null, url);
    },

    removeSite: function() {
      this._addSequence(4093);
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
            url = this.get('presentation.url');

        shortenUrl(url).then(function(res) {
          self.set('shortUrl', res.url);
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

      // deck.set('url', "https://speakerdeck.com/jrallison/ember-components");
      deck.set('url', 'https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?pli=1#slide=id.g177d510c8_0342');
      // deck.set('url', 'http://slid.es/jonathangoldman/reducecomputed/');
      media.set('url', "http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451");
      // media.set('url', "https://soundcloud.com/armadamusic/armin-van-buuren-shivers");
      // media.set('url', 'http://vimeo.com/76153146');
      deck.validate();
      media.validate();
    }
  }
});
