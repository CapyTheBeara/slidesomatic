var Router = Ember.Router.extend(),
    params = ['s'];  // s=sites

function resources() {
  return function() {
    this.resource('deck', { path: '/:deck_id' }, function() {
      this.resource('media', { path: '/:media_id' }, function() {
        this.resource('sequences', { path: ':hash', queryParams: params });
      });
    });
  };
}

Router.map(function() {
  this.route('new');
  this.resource('view', { path: '/view' }, resources());
  this.resource('edit', { path: '/edit' }, resources());
});

export default Router;
