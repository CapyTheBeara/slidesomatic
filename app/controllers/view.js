export default Ember.ObjectController.extend({
  activeTab: 'sequences',
  needs: ['media'],
  timeBinding: 'controllers.media.time',
  presentationModeBinding: 'playback.presentationMode',

  actions: {
    changeTab: function(tab) {
      this.set('activeTab', tab);
    }
  }
});
