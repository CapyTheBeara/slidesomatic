var alias = Em.computed.alias,
    Obj = Ember.Object;

export default Ember.ObjectController.extend({
  slideBinding: 'playback.slide',
  nextSlideBinding: 'playback.nextSlide',
  slideA: Obj.create({ num: 1, showing: true, klass: 'show', name: 'slideA' }),
  slideB: Obj.create({ num: 2, showing: false, klass: 'hide', name: 'slideB' }),

  init: function() {
    this.set('slides', [this.get('slideA'), this.get('slideB')] );
  },

  slideDidChange: function() {
    var slideNum = this.get('slide'),
        nextSlideNum = this.get('nextSlide'),
        slides = this.get('slides'),
        showingSlide = slides.findBy('klass', 'show'),
        hiddenSlide = slides.findBy('klass', 'hide');

    if (slideNum === hiddenSlide.get('num')) {
      slides.forEach(function(_slide) {
        var klass = _slide.get('klass') === 'show' ? 'hide' : 'show';
        _slide.set('showing', !_slide.get('showing'));
        _slide.set('klass', klass);
      });

      showingSlide.set('num', nextSlideNum);

    } else {
      showingSlide.set('num', slideNum);
      hiddenSlide.set('num', nextSlideNum);
    }
  }.observes('slide')
});
