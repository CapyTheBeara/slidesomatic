// https://speakerd.s3.amazonaws.com/presentations/9616ce10144e0131db267ee5813877e8/slide_NUMBER.jpg
var endpoint = "https://speakerd.s3.amazonaws.com/presentations/DOC_ID/slide_NUMBER.jpg";

export default Ember.Component.extend({
  elementId: 'speakerdeck',
  docId: null,
  slide: 1,
  seekNum: Em.computed.oneWay('slide'),
  src: null,
  imgError: null,

  updateSrc: function() {
    var self = this,
        num = this.get('slide') - 1,
        src = endpoint.replace('DOC_ID', this.get('docId')),
        img = $('<img>');

    img.on('load', function() {
        self.set('src', src);
        self.set('imgError', null);
      })
      .on('error', function() {
        self.set('imgError', 'There was an error getting that slide. (It might not exist.)');
      });

    src = src.replace('NUMBER', num);
    img.attr('src', src);
  }.observes('slide', 'docId').on('init'),

  didInsertElement: function() {
    this.sendAction('action', this);
  },

  next: function() {
    this.incrementProperty('slide');
  },

  previous: function() {
    this.decrementProperty('slide');
  },

  jumpTo: function(num) {
    this.set('slide', num);
  },

  getCurrentSlide: function() {
    return this.get('slide');
  },

  actions: {
    next: function() {
      this.next();
    },

    previous: function() {
      this.previous();
    },

    seek: function() {
      this.jumpTo(parseInt(this.get('seekNum'), 10));
    }
  }
});
