export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['deck-player'],
  attributeBindings: ['src', 'alt'],
  alt: 'slide',
  src: null,
  imgEndpoint: null,
  firstIndex: null,
  slide: null,

  updateSrc: function() {
    var slide = this.get('slide');
    if (!slide) { return; }

    var _slide = slide + this.get('firstIndex'),
        src = this.get('imgEndpoint').replace('NUMBER', _slide - 1);

    this.set('src', src);
  }.observes('slide', 'imgEndpoint').on('init'),

  willDestroyElement: function() {
    this.set('playback.slide', 1);
  }
});
