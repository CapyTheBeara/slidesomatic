// https://speakerd.s3.amazonaws.com/presentations/9616ce10144e0131db267ee5813877e8/slide_NUMBER.jpg
var endpoint = "https://speakerd.s3.amazonaws.com/presentations/DOC_ID/slide_NUMBER.jpg";

export default Ember.Component.extend({
  tagName: 'img',
  elementId: 'slide-player',
  attributeBindings: ['src', 'alt'],
  src: null,
  alt: 'slide',
  docId: null,
  slide: 1,

  updateSrc: function() {
    var self = this,
        num = this.get('slide') - 1,
        src = endpoint.replace('DOC_ID', this.get('docId')),
        img = $('<img>');

    img.on('load', function() {
        self.set('src', src);
        self.sendAction('deckViewError', null);
      })
      .on('error', function() {
        self.sendAction('deckViewError', 'There was an error getting that slide. (It might not exist.)');
      });

    src = src.replace('NUMBER', num);
    img.attr('src', src);
  }.observes('slide', 'docId').on('init'),

  didInsertElement: function() {
    this.sendAction('action', this);
  }
});
