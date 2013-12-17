export default Ember.ObjectController.extend({
  deck: null,
  deckView: null,
  slide: Em.computed.alias('deckView.slide'),

  actions: {
    setDeckView: function(view) {
      this.set('deckView', view);
    },

    handleError: function() {
// TODO
    }
  }

});
