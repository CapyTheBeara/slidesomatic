var Router = Ember.Router.extend(), // ensure we don't share routes between all Router instances
    params = ['deck', 'video', 'seq'];

Router.map(function() {
  this.route('presentation', { path: '/show', queryParams: params });
  this.route('new', { path: '/new', queryParams: params });
});

export default Router;
