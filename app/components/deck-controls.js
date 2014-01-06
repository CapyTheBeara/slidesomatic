export default Ember.Component.extend({
  classNames: ['deck-controls', 'input-group'],
  seekNum: 1,
  slide: null,

  slideDidChange: function() {
    this.set('seekNum', this.get('slide'));
  }.observes('slide'),

  actions: {
    next: function() {
      this.incrementProperty('slide');
    },

    previous: function() {
      if (this.get('slide') <= 1) { return false; }
      this.decrementProperty('slide');
    },

    seekTo: function() {
      var slide = parseInt(this.get('seekNum'), 10);
      if (!slide || slide < 0) { return false; }
      this.set('slide', slide);
    }
  }
});
