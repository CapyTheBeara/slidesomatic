var Router = Ember.Router.extend(), // ensure we don't share routes between all Router instances
    params = ['vid', 'vtype', 'seq', 'start', 'did', 'dtype'];

Router.map(function() {
  this.route('presentation', { path: '/show', queryParams: params });
  this.route('new', { path: '/new', queryParams: params });
  this.route('sequences');
});

export default Router;
