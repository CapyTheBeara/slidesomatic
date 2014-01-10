export default Ember.ObjectController.extend({
  message: function() {
console.log('error controller', this.get('model'));
    return 'There was an error!';
  }.property('content')

});
