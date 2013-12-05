var Router = Ember.Router.extend(), // ensure we don't share routes between all Router instances
    params = ['vid', 'vtype', 'seq', 'start', 'did'];

Router.map(function() {
  this.route('index', { path: '/', queryParams: params });
  this.route('new', { path: '/new' });
});

export default Router;
