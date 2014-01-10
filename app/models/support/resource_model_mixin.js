var attr = DS.attr;

export default Ember.Mixin.create({
  type: attr('number'),
  domain: attr(),
  domainRoot: attr(),
  queryResult: attr(),
  presentation: DS.belongsTo('presentation'),

  url: function() {
    return this.get('domain') + this.get('id');
  }.property('domain', 'id'),

  getProperty: function(property) {
    return this.get(this.get('domainRoot') + property);
  }
});
