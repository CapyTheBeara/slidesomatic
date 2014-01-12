import ResourceRoute from 'appkit/routes/support/resource';

export default ResourceRoute.extend({
  name: 'media',

  renderTemplate: function(controller, model) {
    this.render('media', { outlet: 'media' });
  }
});
