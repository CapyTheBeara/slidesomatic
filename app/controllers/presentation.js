var alias = Em.computed.alias;

export default Ember.ArrayController.extend({
  presentation: null,
  currentSequence: null,
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  presentationMode: true,
  needs: ['media'],
  validUrls: Em.computed.and('presentation.deck.valid',
                             'presentation.media.valid'),
  timeBinding: 'playback.time',
  slideBinding: 'playback.slide',

  updateSequence: function() {
    if (!this.get('presentationMode')) { return; }

    var time = this.get('time'),
        currentSequence = this.get('currentSequence'),

        hit = this.filter(function(seq) {
          if (seq.get('start') <= time) { return true; }
        }).get('lastObject');

    if (!hit) { return this.set('currentSequence', this.get('firstObject')); }
    if (!currentSequence || !currentSequence.eq(hit)) {
      this.set('currentSequence', hit);
    }
  }.observes('time'),

  updateSlide: function() {
    this.set('slide', this.get('currentSequence.slide'));
  }.observes('currentSequence'),

  updateScrollTop: function() {  // is this a good thing?
    if (this.get('presentationMode')) {
      var index = this.indexOf(this.get('currentSequence'));
      $('.sequences-table').animate({ scrollTop: 38*(index+1) });  // need to smaple for for height?
    }
  }.observes('currentSequence'),

  actions: {
    skipTo: function(time) {
      var play = this.get('presentationMode');
      this.get('controllers.media').skipTo(time, play);
    }
  }
});
