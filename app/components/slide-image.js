export default Ember.Component.extend({
  classNameBindings: ['staticClassName', 'hidden:hide:show'],
  staticClassName: 'deck-player',
  attributeBindings: ['src', 'alt'],
  alt: 'slide',
  src: null,
  imgEndpoint: null,
  firstIndex: null,
  type: null,
  slide: null,

  init: function() {
    if (this.get('type') === 'google') {
      this.set('tagName', 'iframe');
    } else {
      this.set('tagName', 'img');
    }
    this._super();
  },

  slideDidChange: function() {
    var slide = this.get('slide'),
        hidden = this.get('hidden'),
        pSlide = this.get('playback.slide'),
        pNextSlide = this.get('playback.nextSlide');

    if (!slide) {
      if (hidden) {
        return this.set('slide', pNextSlide);
      }
      return this.set('slide', pSlide);
    }

    if (slide === pSlide) {
      return this.set('hidden', false);
    }

    if (!hidden) {
      Ember.run.next(this, function() {
        this.set('slide', pNextSlide);
      });
      return this.set('hidden', true);
    }

    this.set('slide', pSlide);
    this.set('hidden', false);

  }.observes('playback.slide').on('init'),

  updateSrc: function() {
    var slide = this.get('slide');
    if (!slide) { return; }

    var _slide = slide + this.get('firstIndex'),
        src = this.get('imgEndpoint').replace('NUMBER', _slide - 1);

    this.set('src', src);
  }.observes('slide', 'imgEndpoint').on('init')
});
