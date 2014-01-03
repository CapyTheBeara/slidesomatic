export default Ember.Component.extend({
  tagName: 'iframe',
  classNameBindings: ['staticClassName'],
  staticClassName: 'deck-player',
  attributeBindings: ['src'],
  src: null,
  endpoint: null,
  firstIndex: null,
  slideBinding: 'playback.slide',

  updateSrc: function() {
    var slide = this.get('slide');
    if (!slide) { return; }

    var _slide = slide + this.get('firstIndex'),
        src = this.get('endpoint').replace('NUMBER', _slide - 1);

    this.set('src', src);
  }.observes('slide', 'endpoint').on('init')

});
