export default Ember.ArrayController.extend({
  presentation: null,
  editMode: false,
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  url: Em.computed.alias('presentation.url'),
  showUrl: Em.computed.and('editMode', 'presentation.firstSequence')
});
