import shortenUrl from 'appkit/utils/shorten_url';

export default Ember.ObjectController.extend({
  activeTab: 'slides',
  slideOptions: ['Full Video', 'External Website',
                 'Playback Controls', 'Presentation Mode'],
  selectedSlideOption: null,

  scrubHighValue: 50,
  scrubMediumValue: 50,
  scrubLowValue: 50,

  needs: ['application', 'media', 'deck', 'sequences'],
  sequences: Em.computed.alias('controllers.sequences'),
  slideBinding: 'controllers.deck.slide',
  siteModeBinding: 'controllers.deck.siteMode',
  presentationModeBinding: 'playback.presentationMode',
  videoModeBinding: 'controllers.media.videoMode',
  timeBinding: 'controllers.media.time',

  maxSeqs: function() {
    var base = this.get('url').replace(new RegExp(this.get('encodedSequences')), '');
    return Math.floor((2000 - base.length) / 5);
  }.property('url', 'encodedSequences'),

  _addSequence: function(slideMode, site, timeInc) {
    var seq, args,
        mediaController = this.get('controllers.media'),
        currentTime = mediaController.getCurrentTime(),
        start = timeInc ? currentTime + timeInc : currentTime,
        startExists = this.get('sequences').findBy('start', start);

    if (startExists) {
      alert("Sorry, you've already set this time. Please set a different time.");
      return;
    }

    args = { start: start};
    if (typeof(slideMode) === 'number') { args.slide = slideMode; }
    else { args.mode = slideMode; }
    if (site) { args.site = site; }

    seq = this.store.createRecord('sequence', args);
    this.get('sequences').pushObject(seq);

    this.get('controllers.media').skipTo(start + 0.1);
    this.resetScrubbers();
    return true;
  },

  resetScrubbers: function() {
    this.set('scrubHighValue', 50);
    this.set('scrubMediumValue', 50);
    this.set('scrubLowValue', 50);
    $('input[type=range]').first().focus();
  },

  actions: {
    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    scrub: function(change) {
      this.get('controllers.media').scrub(change);
    },


    changePresentationMode: function(value) {
      this.set('presentationMode', value);
    },

    addSequence: function() {
      var slide = this.get('slide');

      if (this._addSequence(slide)) {
        this.set('slide', slide + 1);
      }
    },

    addSite: function() {
      var url = this.get('site');
      // TODO validate url
      this._addSequence('SITE_ON', url);
    },

    removeSite: function() {
      this._addSequence('SITE_OFF');
    },

    toggleFullVideo: function() {
      if (!this.get('videoMode')) {
        this._addSequence('VIDEO_ON');
      } else {
        this._addSequence('VIDEO_OFF');
      }
    },

    addPause: function() {
      if (this._addSequence('PAUSE_ON')) {
        this._addSequence('PAUSE_OFF', null, 0.4);
      }
    },

    shortenUrl: function() {
      if (confirm('Are you finished?\n(Shortened URLs should only be obtained once you have finished adding all of your slide sequences.)')) {
        var self = this,
            url = this.get('url');

        shortenUrl(url).then(function(res) {
          self.set('shortUrl', res.url);
        });
      }
    }
  }
});
