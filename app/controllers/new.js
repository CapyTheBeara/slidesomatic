export default Ember.Controller.extend({
  deck: null,
  media: null,
  deckUrl: null,
  mediaUrl: null,
  modelsValid: Em.computed.and('deck.valid', 'media.valid'),

  Deck: function() {
    return this.store.modelFor('deck');
  }.property(),

  addModel: function(type) {
    var self = this,
        url = this.get(type + 'Url'),
        model = this.store.createRecord(type, {
          validationState: 'pending'
        });

    this.set(type, null);
    if (!url) { return; }

    this.set(type, model);

    try {  // queryParams will throw error if URL is invalid
      this.get('Deck').find(type, { url: url })
        .then(function(model) {
          self.set(type, model);
          self.transitionToEdit();
        });
    } catch (e) {
      this.set(type + '.validationState', e.message);
    }
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
      this.addModel('deck');
    },

    addMedia: function() {
      this.addModel('media');
    },

    submitUrls: function() {
      this.send('addDeck');
      this.send('addMedia');
    },

    addTestingUrls: function() {
      var deckUrl, mediaUrl,
          self = this;


      deckUrl = 'http://www.slideshare.net/nzakas/maintainable-javascript-2012';
      // deckUrl = 'https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?pli=1#slide=id.g177d510c8_0342';
      // deckUrl = 'http://slid.es/jonathangoldman/reducecomputed/';
      this.set('deckUrl', deckUrl);

      mediaUrl = 'http://www.youtube.com/watch?v=c-kav7Tf834#t=1';
      // mediaUrl = "https://soundcloud.com/armadamusic/armin-van-buuren-shivers";
      this.set('mediaUrl', mediaUrl);

      this.send('submitUrls');
    }
  }
});
