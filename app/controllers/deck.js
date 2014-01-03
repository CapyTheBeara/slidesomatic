export default Ember.ObjectController.extend({
  siteBinding: 'playback.site',
  siteModeBinding: 'playback.siteMode',

  iframe: function() {
    var root = this.get('domainRoot');
    return root === 'google' || root === 'slid';
  }.property('domainRoot')
});
