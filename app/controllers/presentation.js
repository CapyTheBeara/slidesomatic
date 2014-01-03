import FullVideoAnimation from 'appkit/utils/full_video_animation';

var alias = Em.computed.alias,
    MODE_START = 4092,
    rowHeight;

export default Ember.ArrayController.extend({
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  needs: ['media'],

  presentation: null,
  presentationMode: true,
  currentSequence: null,
  videoMode: false,
  animation: null,

  activeTab: 'sequences',
  deckUrl: alias('presentation.deck.url'),
  mediaUrl: alias('presentation.media.url'),
  validUrls: Em.computed.and('presentation.deck.valid',
                             'presentation.media.valid'),
  timeBinding: 'playback.time',
  slideBinding: 'playback.slide',
  siteBinding: 'playback.site',
  siteModeBinding: 'playback.siteMode',

  currentSequenceIndex: function() {
    return this.indexOf(this.get('currentSequence'));
  }.property('currentSequence'),

  nextSlide: function() {
    var currentSeqIndex = this.get('currentSequenceIndex'),
        nextSlideSeq = this.find(function(seq, i) {
          if (i > currentSeqIndex && seq.get('slide') < MODE_START ) {
            return true;
          }
        });

    if (nextSlideSeq) {
      return nextSlideSeq.get('slide');
    }
  }.property('currentSequenceIndex'),

  updateSequence: function() {
    var time = this.get('time'),
        currentSequence = this.get('currentSequence'),

        hit = this.filter(function(seq) {
          if (seq.isPast(time)) { return true; }
        }).get('lastObject'),

        videoSeq = this.filter(function(seq) {
          if (seq.isPastVideo(time)) { return true; }
        }).get('lastObject'),

        siteSeq = this.filter(function(seq) {
          if (seq.isPastSite(time)) { return true; }
        }).get('lastObject');

    if (videoSeq && videoSeq.get('isOn')) { this.set('videoMode', true); }
    else { this.set('videoMode', false); }

    if (siteSeq && siteSeq.get('isOn')) {
      this.setProperties({ siteMode: true, site: siteSeq.get('site')});
    }
    else { this.set('siteMode', false); }

    if (!hit) { return this.set('currentSequence', this.get('firstObject')); }
    if (!currentSequence || !currentSequence.eq(hit)) {
      this.set('currentSequence', hit);
    }
  }.observes('time'),

  currentSequenceDidChange: function() {
    var slide = this.get('currentSequence.slide'),
        nextSlide = this.get('nextSlide');

    if (!this.get('presentationMode') || slide >= MODE_START) { return; }
    this.set('slide', slide);

    if (nextSlide) {
      this.set('playback.nextSlide', nextSlide);
    }
  }.observes('currentSequence'),

  videoModeDidChange: function() {
    if (!this.get('presentationMode')) { return; }

    if (this.get('videoMode')) {
      var anim = FullVideoAnimation.create({ selector: '#media-view' });
      this.set('animation', anim);
      anim.expand();
    } else {
      var _anim = this.get('animation');
      if (!_anim) { return; }
      _anim.contract();
    }
  }.observes('videoMode'),

  updateScrollTop: function() {
    if (this.get('presentationMode')) {
      rowHeight = $('.sequences-table tr:first').height() - 1;
      if (!rowHeight) { return; }

      var index = this.get('currentSequenceIndex');
      $('.sequences-table').animate({ scrollTop: rowHeight*(index - 2) });
    }
  }.observes('currentSequence'),

  actions: {
    skipTo: function(time) {
      var play = this.get('presentationMode');
      this.get('controllers.media').skipTo(time, play);
    },

    changeTab: function(tab) {
      this.set('activeTab', tab);
    }
  }
});
