export default Ember.ObjectController.extend({
  time: null,
  videoUrl: 'http://www.youtube.com/watch?v=bzT0ezT-Jn8#t=3676', // null,
  deckUrl: 'http://www.slideshare.net/tboyt/presentation-27430110', // null,
  newSequence: null,
  deckPlayer: null,
  videoPlayer: null,
  needs: ['sequences'],
  showSequence: Em.computed.and('deck.valid', 'video.valid'),

  init: function() {
    this._super();
    this.set('newSequence', this.store.createRecord('sequence'));
    this.set('controllers.sequences.editMode', true);
  },

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
      this.set('newSequence.start', video.get('start'));
    },

    setDeckPlayer: function(player) {
      this.set('deckPlayer', player);
    },

    setVideoPlayer: function(player) {
      this.set('videoPlayer', player);
    },

    setSequence: function() {
      var deckPlayer = this.get('deckPlayer'),
          videoPlayer = this.get('videoPlayer'),
          currentSlide = deckPlayer.getCurrentSlide(),
          currentTime = Math.round(videoPlayer.currentTime() * 10)/10;

      this.set('newSequence.start', currentTime);
      this.set('newSequence.slide', currentSlide);
    },

    addSequence: function() {
      var seq = this.get('newSequence'),
          model = this.get('model'),
          nextSeq = this.store.createRecord('sequence', {
            slide: seq.get('slide') + 1
          });

      model.get('sequences').pushObject(seq);
      this.set('newSequence', nextSeq);
      this.get('deckPlayer').next();
    }
  }
});
