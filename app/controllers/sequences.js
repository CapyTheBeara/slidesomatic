var rowHeight;

var SequencesController = Ember.ArrayController.extend({
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,

  currentSequence: null,

  // override in route
  editMode: false,

  needs: ['media'],
  timeBinding: 'controllers.media.time',
  presentationModeBinding: 'controllers.media.presentationMode',

  filteredContent: function() {
    if (this.get('editMode')) {
      return this;
    } else {
      return this.filter(function(seq) {
        return seq.get('isNotPauseOff');
      });
    }
  }.property('editMode'),

  timeDidChange: function() {
    var time = this.get('time'),
        currentSequence = this.get('currentSequence'),

        hit = this.filter(function(seq) {
          if (seq.isPast(time)) { return true; }
        }).get('lastObject');

    if (!hit) { return this.set('currentSequence', this.get('firstObject')); }
    if (!currentSequence || !currentSequence.eq(hit)) {
      this.set('currentSequence', hit);
    }
  }.observes('time'),

  updateScrollTop: function() {
    if (this.get('presentationMode')) {
      rowHeight = $('.sequences-table tr:first').height() - 1;
      if (!rowHeight) { return; }

      var index = this.get('currentSequenceIndex');
      $('.sequences-table').animate({ scrollTop: rowHeight*(index - 2) });
    }
  }.observes('currentSequence'),

  currentSequenceIndex: function() {
    return this.indexOf(this.get('currentSequence'));
  }.property('currentSequence'),

  actions: {
    skipTo: function(time) {
      this.get('controllers.media').skipTo(time);
    }
  }
});

export default SequencesController;
