var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default Ember.ArrayController.extend({
  presentation: null,
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  currentSequence: null,
  activeTab: 'slides',
  editMode: true,
  showSeconds: true,
  presentationMode: false,
  needs: ['deck', 'video', 'application'],
  slideBinding: 'controllers.deck.slide',
  timeBinding: 'controllers.video.time',
  deckBinding: 'presentation.deck',
  videoBinding: 'presentation.video',
  shortUrl: null,
  validUrls: Em.computed.and('deck.valid', 'video.valid'),

  toggleModal: function() {
    if (this.get('validUrls')) {
      this.set('controllers.application.modalMode', false);
    }
  }.observes('validUrls'),

  updateSequence: function() {
    if (!this.get('presentationMode')) { return; }

    var time = this.get('time'),
        currentSequence = this.get('currentSequence'),

        hit = this.get('content').filter(function(seq) {
          if (seq.hasPassed(time)) { return true; }
        }).get('lastObject');

    if (!hit) { return this.set('currentSequence', this.get('content.firstObject')); }
    if (!currentSequence || !currentSequence.eq(hit)) {
      this.set('currentSequence', hit);
    }
  }.observes('time'),

  updateSlide: function() {
    this.set('slide', this.get('currentSequence.slide'));
  }.observes('currentSequence'),

  actions: {
    addDeck: function() {
      this.get('deck.proxy').setKeys();
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

    skipTo: function(time) {
      this.get('controllers.video').skipTo(time);
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

      deckProxy.set('url', "http://www.slideshare.net/tboyt/presentation-27430110");
      deckProxy.setKeys();

      videoProxy.set('url', "http://www.youtube.com/watch?v=bzT0ezT-Jn8#t=3676");
      videoProxy.setKeys();
    }
  }
});
