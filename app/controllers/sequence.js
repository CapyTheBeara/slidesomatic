export default Ember.ObjectController.extend({
  needs: ['index'],
  isEditing: false,

  actions: {
    edit: function() {
      this.toggleProperty('isEditing');
    },

    save: function() {
      this.get('proxy').save();
      this.toggleProperty('isEditing');
    }
  }
});
