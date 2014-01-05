var MODE_START = 4092;

export default Ember.ObjectController.extend({
  slide: 1,
  site: null,
  siteMode: false,

  // set/override these in route
  presentationMode: true,
  sequences: null,

  timeBinding: 'sequences.time',
  currentSequenceBinding: 'sequences.currentSequence',

  timeDidChange: function() {
    var time = this.get('time'),

        seq = this.get('sequences').filter(function(seq) {
          if (seq.isPastSite(time)) { return true; }
        }).get('lastObject');

    if (seq && seq.get('isOn')) {
      this.setProperties({ siteMode: true, site: seq.get('site')});
    }
    else { this.set('siteMode', false); }
  }.observes('time'),

  // FIX - if skipping over slides directly to a full video
  // slide won't be the one before the full video
  currentSequenceDidChange: function() {
    var slide = this.get('currentSequence.slide'),
        nextSlide = this.get('nextSlide');

    if (!this.get('presentationMode') || slide >= MODE_START) { return; }
    this.set('slide', slide);

    if (nextSlide) {
      this.set('nextSlide', nextSlide);
    }
  }.observes('currentSequence'),

  nextSlide: function() {
    var sequences = this.get('sequences'),
        currentSequence = this.get('currentSequence'),
        currentIndex = sequences.get('currentSequenceIndex'),

        seq = sequences.find(function(seq, i) {
          if (i > currentIndex && seq.get('slide') < MODE_START ) {
            return true;
          }
        });

    if (seq) { return seq.get('slide'); }
  }.property('sequences', 'currentSequence'),

  iframe: function() {
    var root = this.get('domainRoot');
    return root === 'google' || root === 'slid';
  }.property('domainRoot')
});
