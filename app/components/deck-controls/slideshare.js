export default {
  jumpTo: function(num) {
    this.get('deckView').jumpTo(num);
  },

  next: function() {
    this.get('deckView').next();
  },

  previous: function() {
    this.get('deckView').previous();
  }
};
