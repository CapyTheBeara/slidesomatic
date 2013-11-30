export default DS.Model.extend({
  video: DS.belongsTo('video'),
  sequences: DS.hasMany('sequence')
});
