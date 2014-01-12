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
  }
});
