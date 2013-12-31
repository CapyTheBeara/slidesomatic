import FullVideoAnimation from 'appkit/utils/full_video_animation';

var alias = Em.computed.alias,
    MODE_START = 4094,
    rowHeight;

export default Ember.ArrayController.extend({
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  needs: ['media'],

  presentation: null,
  presentationMode: true,
  currentSequence: null,
  currentMode: null,
  fullVideo: false,
  animation: null,

  validUrls: Em.computed.and('presentation.deck.valid',
                             'presentation.media.valid'),
  timeBinding: 'playback.time',
  slideBinding: 'playback.slide',

  updateSequence: function() {
    var time = this.get('time'),
        currentSequence = this.get('currentSequence'),

        hit = this.filter(function(seq) {
          if (seq.get('start') <= time) { return true; }
        }).get('lastObject'),

        mode = this.filter(function(seq) {
          if (seq.get('slide') >= MODE_START && seq.get('start') <= time) {
            return true;
          }
        }).get('lastObject.slide');

    if (mode) { this.set('currentMode', mode); }
    if (!hit) { return this.set('currentSequence', this.get('firstObject')); }
    if (!currentSequence || !currentSequence.eq(hit)) {
      this.set('currentSequence', hit);
    }
  }.observes('time'),

  currentSequenceDidChange: function() {
    var slide = this.get('currentSequence.slide');
    if (!this.get('presentationMode') || slide >= MODE_START) { return; }
    this.set('slide', slide);
  }.observes('currentSequence'),

  currentModeDidChange: function() {
    switch(this.get('currentMode')) {
      case 4094:
        this.set('fullVideo', true);
        break;
      case 4095:
        this.set('fullVideo', false);
        break;
    }
  }.observes('currentMode'),

  fullVideoDidChange: function() {
    if (!this.get('presentationMode')) { return; }
    var fullVideo = this.get('fullVideo');

    if (fullVideo) {
      var anim = FullVideoAnimation.create({ selector: '#media-view' });
      this.set('animation', anim);
      anim.expand();
    } else if (fullVideo === false) {
      this.get('animation').contract();
    }
  }.observes('fullVideo'),

  updateScrollTop: function() {
    if (this.get('presentationMode')) {
      rowHeight = $('.sequences-table tr:first').height() - 1;
      if (!rowHeight) { return; }

      var index = this.indexOf(this.get('currentSequence'));
      $('.sequences-table').animate({ scrollTop: rowHeight*(index - 2) });
    }
  }.observes('currentSequence'),

  actions: {
    skipTo: function(time) {
      var play = this.get('presentationMode');
      this.get('controllers.media').skipTo(time, play);
    }
  }
});
