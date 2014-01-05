import SlideIframe from 'appkit/components/slide-iframe';

export default SlideIframe.extend({
  tagName: 'img',
  classNameBindings: ['hidden:hide:show'],
  attributeBindings: ['alt'],
  alt: 'slide',
  slide: null,

  slideDidChange: function() {
    var slide = this.get('slide'),
        hidden = this.get('hidden'),
        pSlide = this.get('deck.slide'),
        pNextSlide = this.get('deck.nextSlide');

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

  }.observes('deck.slide').on('init')
});
