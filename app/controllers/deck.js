export default Ember.ObjectController.extend({
  deck: null,
  deckView: null,
  slide: 1,

  slideDidChange: function() {
    var tagName = this.get('deckView.tagName');

    if (tagName !== 'img') {  // slideshare player
      this.get('deckView').jumpTo(this.get('slide'));
    }
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
