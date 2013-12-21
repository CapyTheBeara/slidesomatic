var alias = Em.computed.alias;

export default Ember.ArrayController.extend({
  presentation: null,
  currentSequence: null,
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  presentationMode: true,
  needs: ['deck', 'video'],
  deck: alias('presentation.deck'),
  video: alias('presentation.video'),
  slideBinding: 'presentation.deck.slide',
  timeBinding: 'presentation.video.time',
  validUrls: Em.computed.and('deck.valid', 'video.valid'),

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

  actions: {
    skipTo: function(time) {
      var play = this.get('presentationMode');
      this.get('controllers.video').skipTo(time, play);
    }
  }
});
