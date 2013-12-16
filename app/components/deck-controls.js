import slideshareMixin from 'appkit/components/deck-controls/slideshare';

export default Ember.Component.extend({
  deckView: null,
  seekNum: 1,
  useMixin: false,
  deckPlayer: null,

  slide: function() {
    return this.get('deckView.slide') || 1;
  }.property('deckView.slide'),

  updateSeekNum: function() {
    this.set('seekNum', parseInt(this.get('slide'), 10));
    if (this.get('useMixin')) {
      this.updatePlayerSlide();  // couldn't get slide observer to work in mixin
    }
  }.observes('slide'),

  didInsertElement: function() {
    this.addMixin();
    this.set('deckPlayer', this);
  },

  addMixin: function() {
    var ctor = this.constructor,
        tagName = this.get('deckView.tagName');

    if (tagName !== 'img') {
      this.set('useMixin', true);
      ctor.reopen(slideshareMixin);
      ctor.create();  // for the mixin to take effect. ?Ember needs fixin?
    }
  },

  jumpTo: function(num) {
    this.set('slide', num);
  },

  next: function() {
    this.incrementProperty('slide');
  },

  previous: function() {
    if (this.get('slide') > 1) {
      this.decrementProperty('slide');
      return true;
    }
  },

  actions: {
    next: function() {
      this.next();
      this.sendAction('action', this.get('slide'));
    },

    previous: function() {
      if (this.previous()) {
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
