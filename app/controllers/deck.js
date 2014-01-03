export default Ember.ObjectController.extend({
  iframe: function() {
    var root = this.get('domainRoot');
    return root === 'google' || root === 'slid';
  }.property('domainRoot')
});
