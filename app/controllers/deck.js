export default Ember.Controller.extend({
  deck: null,
  deckView: null,
  slide: 1,

  slideDidChange: function() {
    var slide = this.get('slide'),
        tagName = this.get('deckView.tagName');


    if (tagName !== 'img') {  // slideshare
      var deckView = this.get('deckView');
      return deckView && deckView.jumpTo(slide);
    }

    this.set('deckView.slide', slide);  // speakerdeck
  }.observes('slide'),

  actions: {
    setDeckView: function(view) {
      this.set('deckView', view);
    },

    handleError: function() {  // img error (ie. slide doesn't exist)
// TODO
    }
  }

});
