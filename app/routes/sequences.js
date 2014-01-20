// sequencesHash:
// 01000020BW030I4040RC050Sg060cO070i0080si090xK0A1CC_-1Fu__1R00B1RU_-1Yc__1cW0C1cm0D1dK0E1le0F1wk0G20m0H27C0I2G40K2Ki_-0zK__194_-2LU
// sites param
// _y4oohttp%3A%2F%2Fdiscourse.org%2F+_y6GFhttp%3A%2F%2Femblemjs.com%2F+_y6Qchttp%3A%2F%2Fiamstef.net%2Fember-app-kit%2F

export default Ember.Route.extend({
  model: function(params, queryParams) {
    var hash = params.hash,
        pres = this.modelFor('view') || this.modelFor('edit'),
        sitesHash = queryParams.s;

    if (hash) { pres.set('sequencesHash', hash); }
    if (sitesHash) { pres.set('sitesHash', sitesHash); }

    return pres.get('sequences');
  },

  renderTemplate: function() {
    this.render('sequences', { outlet: 'sequences' });
  }
});
