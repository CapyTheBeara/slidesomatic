export default Ember.ObjectController.extend({
  time: null,
  videoUrl: null,
  deckUrl: null,

  actions: {
    setTime: function(time) {
      this.set('time', time);
    },

    addDeck: function() {
      var url = this.get('deckUrl'),
          deck = this.store.createRecord('deck', {url: url});

      this.set('model.deck', deck);
    },

    addVideo: function() {
      var url = this.get('videoUrl'),
          video = this.store.createRecord('yt_video', {url: url});

      this.set('model.video', video);
    }
  }
});
