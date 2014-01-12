import ResourceRoute from 'appkit/routes/support/resource';

export default ResourceRoute.extend({
  name: 'deck',

  renderTemplate: function(controller, model) {
    this.render('deck', { outlet: 'deck'});
  }
});
