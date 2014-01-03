var Router = Ember.Router.extend(),
    params = ['d', 'm', 's', 'v', 'u'];  // d=deck, m=media, s=sequences, v=version, u=urls

Router.map(function() {
  this.route('presentation', { path: '/', queryParams: params });
  this.route('new', { path: '/new', queryParams: params });
});

export default Router;
