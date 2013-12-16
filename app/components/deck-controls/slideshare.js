export default Ember.Mixin.create({
  updatePlayerSlide: function() {
    this.get('deckView').jumpTo(this.get('slide'));
  }
});
