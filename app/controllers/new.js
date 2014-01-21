export default Ember.Controller.extend({
  deck: null,
  media: null,
  deckUrl: null,
  mediaUrl: null,
  requestPending: null,
  modelsValid: Em.computed.and('deck.valid', 'media.valid'),

  Deck: function() {
    return this.store.modelFor('deck');
  }.property(),

  addModel: function(type) {
    var self = this,
        url = this.get(type + 'Url');

    if (!url) { return; }

    var model = this.get('Deck').find(type, { url: url })
                    .then(function(model) {
                      self.set(type, model);
                      self.set('requestPending', null);
                      self.transitionToEdit();
                    });
  },

  transitionToEdit: function() {
    if (!this.get('modelsValid')) { return; }

    var deck = this.get('deck'),
        media = this.get('media'),
        pres = this.store.createRecord('presentation');

    this.transitionToRoute('edit.sequences', pres, deck, media, pres);
  },

  actions: {
    addDeck: function() {
      this.set('requestPending', true);
      this.addModel('deck');
    },

    addMedia: function() {
      this.set('requestPending', true);
      this.addModel('media');
    },

    submitUrls: function() {
      this.send('addDeck');
      this.send('addMedia');
    },

    addTestingUrls: function() {
      var deck, media,
          self = this,
          deckUrl = 'http://www.slideshare.net/nzakas/maintainable-javascript-2012',
          mediaUrl = 'http://www.youtube.com/watch?v=c-kav7Tf834';

      // deckUrl = 'http://www.slideshare.net/nzakas/maintainable-javascript-2012';
      // deckUrl = 'https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?pli=1#slide=id.g177d510c8_0342';
      // deckUrl = 'http://slid.es/jonathangoldman/reducecomputed/';
      // videoUrl = "http://www.youtube.com/watch?v=c-kav7Tf834";
      // videoUrl = "https://soundcloud.com/armadamusic/armin-van-buuren-shivers";

      this.set('deckUrl', deckUrl);
      this.set('mediaUrl', mediaUrl);
      this.send('submitUrls');
    }
  }
});
