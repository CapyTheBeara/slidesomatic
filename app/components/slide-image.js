export default Ember.Component.extend({
  tagName: 'img',
  elementId: 'deck-player',
  attributeBindings: ['src', 'alt'],
  alt: 'slide',
  src: null,
  firstIndex: null,
  slideBinding: 'playback.slide',

  updateSrc: function() {
    var slide = this.get('slide');
    if (!slide) { return; }

    var self = this,
        _slide = slide + this.get('firstIndex'),
        src = this.get('imgEndpoint').replace('NUMBER', _slide - 1),
        img = $('<img>');

    img.on('load', function() {
        self.set('src', src);
        self.sendAction('deckViewError', null);
      })
      .on('error', function() {
        self.sendAction('deckViewError', 'There was an error getting that slide. (It might not exist.)');
      });

    img.attr('src', src);
  }.observes('slide', 'imgEndpoint').on('init')
});
