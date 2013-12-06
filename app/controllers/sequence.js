export default Ember.ObjectController.extend({
  needs: ['sequences'],
  isEditing: false,
  currentSequence: Em.computed.alias('controllers.sequences.currentSequence'),

  isPast: function() {
    return this.get('start') < this.get('currentSequence.start');
  }.property('currentSequence'),

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
        this.get('controllers.sequences').removeObject(this);
      }
    }
  }
});
