var Router = Ember.Router.extend(),
    params = ['d', 'm', 's', 'v'];  // d=deck, m=media, s=sequences, v=version

Router.map(function() {
  this.route('presentation', { path: '/show', queryParams: params });
  this.route('new', { path: '/new', queryParams: params });
});

export default Router;
