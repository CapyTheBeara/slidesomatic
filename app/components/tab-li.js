export default Ember.Component.extend({
  tagName: 'li',
  tabName: null,
  activeTab: null,
  classNameBindings: ['isActive:active'],

  isActive: function() {
    return this.get('tabName') === this.get('activeTab');
  }.property('tabName', 'activeTab'),

  click: function() {
    this.sendAction('action', this.get('tabName'));
  }
});
