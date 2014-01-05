export default Ember.ObjectController.extend({
  activeTab: 'sequences',
  validUrls: Em.computed.and('deck.valid', 'media.valid'),

  needs: ['media'],
  timeBinding: 'controllers.media.time',

  actions: {
    changeTab: function(tab) {
      this.set('activeTab', tab);
    }
  }
});
