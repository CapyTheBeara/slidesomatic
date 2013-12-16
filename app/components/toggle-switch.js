export default Ember.Component.extend({
  classNames: ['toggle-switch', 'large'],
  attributeBindings: ['value:checked'],
  value: false,

  checkBoxId: function() {
    return "checker-" + this.get('elementId');
  },

  change: function() {
    this.toggleProperty('value');
    this.sendAction('action', this.get('value'));
  }
});
