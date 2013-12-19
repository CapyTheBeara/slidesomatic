export default Ember.ObjectController.extend({
  parentController: null,
  isEditing: false,
  currentSequence: Em.computed.alias('parentController.currentSequence'),

  isPast: function() {
    return this.get('start') < this.get('currentSequence.start');
  }.property('currentSequence'),

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  },

  actions: {
    edit: function() {
      this.toggleProperty('isEditing');
    },

    save: function() {
      this.get('proxy').save();
      this.toggleProperty('isEditing');
    },

    destroy: function() {
      if (confirm('Remove this sequence?')) {
        this.get('parentController').removeObject(this);
      }
    }
  }
});
