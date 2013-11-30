var attr = DS.attr;

export default DS.Model.extend({
  start: attr(),
  url: attr(),
  presentation: DS.belongsTo('presentation')
});
