export default {
  updatePlayerSlide: function() {
    var slide = this.get('slide'),
        deckView = this.get('deckView');

    deckView.jumpTo(slide);

    if (slide === 1) {  // get rid of bouncing arrow
      deckView.next();
      deckView.previous();
    }
  }
};
