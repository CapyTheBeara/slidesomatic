var Router = Ember.Router.extend(),
    params = ['s'];  // s=sites

function resources(name) {
  return function() {
    this.resource('deck', { path: '/:deck_id' }, function() {
      this.resource('media', { path: '/:media_id' }, function() {
        this.resource(name + 'sequences', { path: ':hash', queryParams: params });
      });
    });
  };
}

Router.map(function() {
  this.route('new');
  this.resource('view', { path: '/view' }, resources(''));
  this.resource('edit', { path: '/edit/:presentation_id' }, resources('edit.'));

});

export default Router;
