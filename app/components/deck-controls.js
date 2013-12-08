import speakerdeckMixin from 'appkit/components/deck-controls/speakerdeck';
import slideshareMixin from 'appkit/components/deck-controls/slideshare';

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
    this.addMixin();
    this.sendAction('setPlayer', this);
  },

  addMixin: function() {
    var ctor = this.constructor,
        tagName = this.get('deckView.tagName'),
        mixin = tagName === 'img' ? speakerdeckMixin : slideshareMixin;

    ctor.reopen(mixin);
    ctor.create();  // for the mixin to take effect. ?Ember needs fixin?
  },

  actions: {
    next: function() {
      this.next();
      this.sendAction('action', this.get('slide'));
    },

    previous: function() {
      if (this.previous()) {
        this.sendAction('action', this.get('slide'));
      };
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
