export default Ember.Component.extend({
  deckView: null,
  seekNum: 1,
  slide: Em.computed.alias('deckView.slide'),

  updateSeekNum: function() {  // is there a better way to do this?
    this.set('seekNum', parseInt(this.get('slide'), 10));
  }.observes('slide'),

  currentSlide: function() {
    return this.get('slide');
  },

  didInsertElement: function() {
    this.sendAction('setPlayer', this);
  },

  jumpTo: function(num) {
    this.set('slide', num);
  },

  actions: {
    next: function() {
      this.incrementProperty('slide');
      this.sendAction('action', this.get('slide'));
    },

    previous: function() {
      if (this.get('slide') > 1) {
        this.decrementProperty('slide');
        this.sendAction('action', this.get('slide'));
      }
    },

    seekTo: function() {
      var seekNum = this.get('seekNum');
      if (!seekNum) { return; }

      var target = parseInt(seekNum, 10);
      this.jumpTo(target);
      this.sendAction('action', target);
    }
  }
});
