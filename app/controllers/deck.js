var equal = Em.computed.equal;

export default Ember.ObjectController.extend({
  deckView: null,
  slideBinding: 'content.slide',

  slideDidChange: function() {
    var slide = this.get('slide'),
        deckView = this.get('deckView');

    if (deckView) {
      this.set('deckView.slide', slide);
    }
  }.observes('slide', 'deckView'),

  actions: {
    setDeckView: function(view) {
      this.set('deckView', view);
    },

    handleError: function() {  // img error (ie. slide doesn't exist)
// TODO
    }
  }

});
