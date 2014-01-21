/* jshint eqeqeq: false */

import queryParams from 'appkit/utils/query_params';

var attr = DS.attr;

export default Ember.Mixin.create({
  type: attr('number'),
  domain: attr(),
  domainRoot: attr(),
  queryResult: attr(),
  presentation: DS.belongsTo('presentation'),

  validationState: null,

  valid: function() {
    return this.get('validationState') === 'valid';
  }.property('validationState'),

  url: function() {
    return this.get('domain') + this.get('id');
  }.property('domain', 'id'),

  getProperty: function(property) {
    return this.get(this.get('domainRoot') + property);
  },

  setPropertiesFromParams: function(params) {
    this.setProperties(queryParams(params));
  },

  validateQueryResult: function() {
    var results, status,
        state = 'invalidId',
        res = this.get('queryResult');

    if (!res) { return; }

    if (res.query) {  // yql query
      results = res.query.results;

      if (results) {
        if (results.resources) {
          status = results.resources.status;

          if (status && status == '200') {  // VALIDATE that large google presentations don't error
            state = 'valid';
          }
        } else {
          state = 'valid';
        }
      }
    } else if (res.apiVersion) {  // gdata for youtube
      state = 'valid';
    }

    this.set('validationState', state);
  }.observes('queryResult').on('init')
});
