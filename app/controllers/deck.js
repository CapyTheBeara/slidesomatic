export default Ember.ObjectController.extend({
  deckView: null,
  slide: 1,

  slideshare: function() {
    return this.get('domainRoot') === 'slideshare';
  }.property('domainRoot'),

  speakerdeck: function() {
    return this.get('domainRoot') === 'speakerdeck';
  }.property('domainRoot'),

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
