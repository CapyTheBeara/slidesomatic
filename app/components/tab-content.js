export default Ember.Component.extend({
  tabName: null,
  activeTab: null,
  classNameBindings: ['isHidden:hide', 'name'],

  name: function() {
    return this.get('tabName') + '-tab-content';
  }.property('tabName'),

  isHidden: function() {
    return this.get('tabName') !== this.get('activeTab');
  }.property('tabName', 'activeTab')
});
